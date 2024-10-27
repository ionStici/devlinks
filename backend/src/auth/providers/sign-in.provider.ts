import {
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { SignInDto } from '../dtos/sign-in.dto';
import { GenerateTokensProvider } from './generate-tokens.provider';
import { HashingProvider } from './hashing.provider';
import { Res } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class SignInProvider {
  constructor(
    private readonly usersService: UsersService,

    private readonly hashingProvider: HashingProvider,

    private readonly generateTokensProvider: GenerateTokensProvider,
  ) {}

  public async signIn(signInDto: SignInDto, res: Response) {
    const user = await this.usersService.findUserByEmail(signInDto.email);

    let doesPasswordMatch: boolean = false;

    try {
      doesPasswordMatch = await this.hashingProvider.comparePassword(
        signInDto.password,
        user.password,
      );
    } catch {
      throw new RequestTimeoutException('Operation Failed.');
    }

    if (!doesPasswordMatch) {
      throw new UnauthorizedException('Incorrect Password');
    }

    const { accessToken, refreshToken } =
      await this.generateTokensProvider.generateTokens(user);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/auth/refresh-token',
    });

    return { accessToken };
  }
}

// const { accessToken, refreshToken } = await this.authService.login(loginDto);

// // Set the refresh token as an httpOnly, secure cookie
// res.cookie('refreshToken', refreshToken, {
//   httpOnly: true,
//   secure: true, // Set to true in production (requires HTTPS)
//   sameSite: 'strict', // Helps mitigate CSRF attacks
//   maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiration time (e.g., 7 days)
//   path: '/auth/refresh-token', // Cookie is only sent to this path
// });

// // Return the access token in the response body
// return { accessToken };
