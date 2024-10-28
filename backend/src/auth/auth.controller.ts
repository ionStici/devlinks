import { Controller, Inject, Body, Post, Req, Res, Get } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoginDto } from './dtos/login.dto';
import { AuthService } from './providers/auth.service';
import jwtConfig from './config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { REQUEST_USER_KEY } from './constants/auth.constants';
import { Auth } from './decorators/auth.decorator';
import { AuthType } from './enums/auth-type.enum';

@Controller('auth')
export class AuthController {
  private readonly refreshTokenTtl: number;

  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly authService: AuthService,
  ) {
    this.refreshTokenTtl = jwtConfiguration.refreshTokenTtl;
  }

  @Auth(AuthType.Bearer)
  @Get('get')
  async getUser(@Req() request: Request) {
    return request[REQUEST_USER_KEY];
  }

  @Auth(AuthType.None)
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken, refreshToken } =
      await this.authService.login(loginDto);

    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: this.refreshTokenTtl * 1000,
    });

    return { accessToken };
  }

  @Auth(AuthType.None)
  @Post('refresh')
  async refreshTokens(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.refreshTokens(
      request.cookies.refreshToken,
    );

    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: this.refreshTokenTtl * 1000,
    });

    return { accessToken };
  }
}
