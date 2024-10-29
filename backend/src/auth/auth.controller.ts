import {
  Controller,
  Inject,
  Body,
  Post,
  Req,
  Res,
  Get,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
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
  private readonly cookieOptions: Record<string, any>;

  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly authService: AuthService,
  ) {
    this.refreshTokenTtl = jwtConfiguration.refreshTokenTtl;
    this.cookieOptions = {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: this.refreshTokenTtl * 1000,
    };
  }

  @Auth(AuthType.None)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const tokens = await this.authService.login(loginDto);
    response.cookie('refreshToken', tokens.refreshToken, this.cookieOptions);
    return { accessToken: tokens.accessToken };
  }

  @Auth(AuthType.None)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken = request.cookies?.refreshToken;

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    const tokens = await this.authService.refreshTokens(refreshToken);

    response.cookie('refreshToken', tokens.refreshToken, this.cookieOptions);

    return { accessToken: tokens.accessToken };
  }

  @Post('logout')
  async logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken = request.cookies?.refreshToken;

    if (refreshToken) {
      await this.authService.logout(refreshToken);
    }

    response.clearCookie('refreshToken', { ...this.cookieOptions, maxAge: 0 });

    return { message: 'Logged out successfully' };
  }

  @Auth(AuthType.Bearer)
  @Get('me')
  async getUser(@Req() request: Request) {
    const { sub, email } = request[REQUEST_USER_KEY];
    return { id: sub, email };
  }
}
