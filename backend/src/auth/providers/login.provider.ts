import {
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { LoginDto } from '../dtos/login.dto';
import { HashingProvider } from './hashing.provider';
import { TokensProvider } from './tokens.provider';

@Injectable()
export class LoginProvider {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashingProvider: HashingProvider,
    private readonly tokensProvider: TokensProvider,
  ) {}

  public async login(loginDto: LoginDto) {
    const user = await this.usersService.findUser({ email: loginDto.email });

    let doesPasswordMatch: boolean = false;

    try {
      doesPasswordMatch = await this.hashingProvider.comparePassword(
        loginDto.password,
        user.password,
      );
    } catch {
      throw new RequestTimeoutException('Login Failed.');
    }

    if (!doesPasswordMatch) {
      throw new UnauthorizedException('Incorrect Password.');
    }

    return await this.tokensProvider.generateTokens(user);
  }
}
