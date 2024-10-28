import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/providers/users.service';
import jwtConfig from '../config/jwt.config';
import { GenerateTokensProvider } from './generate-tokens.provider';

@Injectable()
export class RefreshTokensProvider {
  private readonly secret: string;
  private readonly audience: string;
  private readonly issuer: string;

  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly generateTokensProvider: GenerateTokensProvider,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {
    const { secret, audience, issuer } = jwtConfiguration;
    this.secret = secret;
    this.audience = audience;
    this.issuer = issuer;
  }

  public async refreshTokens(refreshToken: string) {
    try {
      const { sub } = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.secret,
        audience: this.audience,
        issuer: this.issuer,
      });

      const user = await this.usersService.findUserById(sub);

      return await this.generateTokensProvider.generateTokens(user);
    } catch {
      throw new UnauthorizedException('Invalid credentials.');
    }
  }
}
