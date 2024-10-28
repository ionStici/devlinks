import { Injectable } from '@nestjs/common';
import { LoginDto } from '../dtos/login.dto';
import { LoginProvider } from './login.provider';
import { RefreshTokensProvider } from './refresh-tokens.provider';

@Injectable()
export class AuthService {
  constructor(
    private readonly loginProvider: LoginProvider,
    private readonly refreshTokensProvider: RefreshTokensProvider,
  ) {}

  public async login(loginDto: LoginDto) {
    return await this.loginProvider.login(loginDto);
  }

  public async refreshTokens(refreshToken: string) {
    return await this.refreshTokensProvider.refreshTokens(refreshToken);
  }
}
