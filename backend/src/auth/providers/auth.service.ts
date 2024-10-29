import { Injectable } from '@nestjs/common';
import { LoginDto } from '../dtos/login.dto';
import { LoginProvider } from './login.provider';
import { RefreshTokensProvider } from './refresh-tokens.provider';
import { LogoutProvider } from './logout.provider';

@Injectable()
export class AuthService {
  constructor(
    private readonly loginProvider: LoginProvider,
    private readonly logoutProvider: LogoutProvider,
    private readonly refreshTokensProvider: RefreshTokensProvider,
  ) {}

  public async login(loginDto: LoginDto) {
    return await this.loginProvider.login(loginDto);
  }

  public async logout(refreshToken: string) {
    return this.logoutProvider.logout(refreshToken);
  }

  public async refreshTokens(refreshToken: string) {
    return await this.refreshTokensProvider.refreshTokens(refreshToken);
  }

  public async isTokenBlacklisted(refreshToken: string) {
    return this.logoutProvider.isTokenBlacklisted(refreshToken);
  }
}
