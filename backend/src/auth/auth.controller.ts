import { Body, Controller, Post, Res } from '@nestjs/common';
import { SignInDto } from './dtos/sign-in.dto';
import { AuthService } from './providers/auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signIn(signInDto, res);
  }
}
