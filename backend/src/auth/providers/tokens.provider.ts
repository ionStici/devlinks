import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from 'src/config/jwt.config';
import { UsersService } from 'src/users/providers/users.service';
import { User } from 'src/users/user.entity';

type TokenPayload = { email?: string; [key: string]: any };
type TokenUser = Pick<User, 'id' | 'email'>;

@Injectable()
export class TokensProvider {
  private readonly secret: string;
  private readonly audience: string;
  private readonly issuer: string;
  private readonly accessTokenTtl: number;
  private readonly refreshTokenTtl: number;

  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {
    const { secret, audience, issuer, accessTokenTtl, refreshTokenTtl } =
      jwtConfiguration;
    this.secret = secret;
    this.audience = audience;
    this.issuer = issuer;
    this.accessTokenTtl = accessTokenTtl;
    this.refreshTokenTtl = refreshTokenTtl;
  }

  public async generateTokens(user: TokenUser) {
    try {
      const [accessToken, refreshToken] = await Promise.all([
        this.signToken(user.id, this.accessTokenTtl, { email: user.email }),
        this.signToken(user.id, this.refreshTokenTtl),
      ]);

      return { accessToken, refreshToken } as const;
    } catch {
      throw new UnauthorizedException('invalid Credentials.');
    }
  }

  public async refreshTokens(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    try {
      const { sub } = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.secret,
        audience: this.audience,
        issuer: this.issuer,
      });

      const user = await this.usersService.findUser({ id: sub });
      return await this.generateTokens(user);
    } catch {
      throw new UnauthorizedException('invalid Credentials.');
    }
  }

  public async signToken(
    userId: number | string,
    expiresIn: number,
    payload: TokenPayload = {},
  ) {
    return await this.jwtService.signAsync(
      { sub: userId, ...payload },
      {
        secret: this.secret,
        audience: this.audience,
        issuer: this.issuer,
        expiresIn,
      },
    );
  }
}
