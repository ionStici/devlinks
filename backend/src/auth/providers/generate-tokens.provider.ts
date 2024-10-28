import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { User } from 'src/users/user.entity';

type TokenPayload = {
  email?: string;
  [key: string]: any;
};

type TokenUser = Pick<User, 'id' | 'email'>;

@Injectable()
export class GenerateTokensProvider {
  private readonly secret: string;
  private readonly audience: string;
  private readonly issuer: string;
  private readonly accessTokenTtl: number;
  private readonly refreshTokenTtl: number;

  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly jwtService: JwtService,
  ) {
    const { secret, audience, issuer, accessTokenTtl, refreshTokenTtl } =
      jwtConfiguration;
    this.secret = secret;
    this.audience = audience;
    this.issuer = issuer;
    this.accessTokenTtl = accessTokenTtl;
    this.refreshTokenTtl = refreshTokenTtl;
  }

  public async signToken(
    userId: number,
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

  public async generateTokens(user: TokenUser) {
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken(user.id, this.accessTokenTtl, { email: user.email }),
      this.signToken(user.id, this.refreshTokenTtl),
    ]);
    return { accessToken, refreshToken } as const;
  }
}
