import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { GenerateTokensProvider } from './generate-tokens.provider';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class RefreshTokensProvider {
  constructor(
    private readonly jwtService: JwtService,

    private readonly generateTokensProvider: GenerateTokensProvider,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    private readonly usersService: UsersService,
  ) {}

  public async refreshTokens(refreshToken: string) {
    try {
      const { sub } = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      });

      const user = await this.usersService.findUserById(sub);

      // return await this.generateTokensProvider.generateTokens(user);
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token.');
    }
  }
}
