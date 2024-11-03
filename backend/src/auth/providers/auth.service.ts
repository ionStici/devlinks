import { Injectable } from '@nestjs/common';
import { LoginDto } from '../dtos/login.dto';
import { LoginProvider } from './login.provider';
import { RefreshTokensProvider } from './refresh-tokens.provider';
import { LogoutProvider } from './logout.provider';
import { UsersService } from 'src/users/providers/users.service';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { GenerateTokensProvider } from './generate-tokens.provider';
import { ProfilesService } from 'src/profiles/providers/profiles.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly loginProvider: LoginProvider,
    private readonly logoutProvider: LogoutProvider,
    private readonly refreshTokensProvider: RefreshTokensProvider,
    private readonly generateTokensProvider: GenerateTokensProvider,
    private readonly usersService: UsersService,
    private readonly profilesService: ProfilesService,
  ) {}

  // Login
  public async login(loginDto: LoginDto) {
    return this.loginProvider.login(loginDto);
  }

  // Logout
  public async logout(refreshToken: string) {
    return this.logoutProvider.logout(refreshToken);
  }

  // Register
  public async register(createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  // Get active user profile
  public async getProfile(userEmail: string) {
    const { email, profile } = await this.profilesService.getProfile(userEmail);
    return { email, ...profile };
  }

  // Reset Password
  public async resetPassword(email: string) {
    console.log(email);
    return 'Password reset is not implemented yet.';
  }

  // Generate Tokens
  public async generateTokens(id: number, email: string) {
    return this.generateTokensProvider.generateTokens({ id, email });
  }

  // Refresh Tokens
  public async refreshTokens(refreshToken: string) {
    return this.refreshTokensProvider.refreshTokens(refreshToken);
  }

  // Check if refresh token is revoked
  public async isTokenBlacklisted(refreshToken: string) {
    return this.logoutProvider.isTokenBlacklisted(refreshToken);
  }
}
