import { Injectable } from '@nestjs/common';
import { ProfilesService } from 'src/profiles/providers/profiles.service';
import { UsersService } from 'src/users/providers/users.service';
import { LoginDto } from '../dtos/login.dto';
import { RegisterDto } from '../dtos/register.dto';
import { LoginProvider } from './login.provider';
import { TokensProvider } from './tokens.provider';

@Injectable()
export class AuthService {
  constructor(
    private readonly loginProvider: LoginProvider,
    private readonly usersService: UsersService,
    private readonly profilesService: ProfilesService,
    private readonly tokensProvider: TokensProvider,
  ) {}

  // Login
  public async login(loginDto: LoginDto) {
    return this.loginProvider.login(loginDto);
  }

  // Register
  public async register(registerDro: RegisterDto) {
    const newUser = await this.usersService.createUser(registerDro);
    return await this.tokensProvider.generateTokens(newUser);
  }

  // Get Profile
  public async getActiveProfile(email: string) {
    const profile = await this.profilesService.getProfileByEmail(email);
    return { email, ...profile };
  }

  // Refresh Tokens
  public async refreshTokens(refreshToken: string) {
    return this.tokensProvider.refreshTokens(refreshToken);
  }
}
