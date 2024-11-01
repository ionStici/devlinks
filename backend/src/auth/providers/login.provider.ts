import {
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { LoginDto } from '../dtos/login.dto';
import { GenerateTokensProvider } from './generate-tokens.provider';
import { HashingProvider } from './hashing.provider';

@Injectable()
export class LoginProvider {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashingProvider: HashingProvider,
    private readonly generateTokensProvider: GenerateTokensProvider,
  ) {}

  public async login(loginDto: LoginDto) {
    const user = await this.usersService.findUserByEmail(loginDto.email);

    let doesPasswordMatch: boolean = false;

    try {
      doesPasswordMatch = await this.hashingProvider.comparePassword(
        loginDto.password,
        user.password,
      );
    } catch {
      throw new RequestTimeoutException('Operation Failed.');
    }
    console.log(doesPasswordMatch);

    if (!doesPasswordMatch) {
      throw new UnauthorizedException('Incorrect Password');
    }

    return await this.generateTokensProvider.generateTokens(user);
  }
}
