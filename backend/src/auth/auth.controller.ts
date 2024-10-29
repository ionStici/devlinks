import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Request, Response } from 'express';
import jwtConfig from './config/jwt.config';
import { Auth } from './decorators/auth.decorator';
import { LoginDto } from './dtos/login.dto';
import { AuthType } from './enums/auth-type.enum';
import { AuthService } from './providers/auth.service';

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

    const isBlacklisted =
      await this.authService.isTokenBlacklisted(refreshToken);

    if (isBlacklisted) {
      throw new UnauthorizedException('Token has been revoked');
    }

    const tokens = await this.authService.refreshTokens(refreshToken);

    response.cookie('refreshToken', tokens.refreshToken, this.cookieOptions);

    return { accessToken: tokens.accessToken };
  }

  @Auth(AuthType.None)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken = request.cookies?.refreshToken;

    if (!refreshToken) {
      throw new UnauthorizedException('No tokens provided');
    }

    if (refreshToken) {
      await this.authService.logout(refreshToken);
    }

    response.clearCookie('refreshToken', { ...this.cookieOptions, maxAge: 0 });

    return { message: 'Logged out successfully' };
  }
}
