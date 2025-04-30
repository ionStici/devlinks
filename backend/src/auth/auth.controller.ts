import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { CookieOptions, Request, Response } from 'express';
import jwtConfig from 'src/config/jwt.config';
import { ActiveUser } from './decorators/active-user.decorator';
import { Public } from './decorators/public.decorator';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { ActiveUserData } from './interfaces/active-user-data.interface';
import { AuthService } from './providers/auth.service';

@Controller('auth')
export class AuthController {
  private readonly REFRESH_TOKEN_COOKIE = 'refresh_token';
  private readonly cookieOptions: CookieOptions;

  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly authService: AuthService,
  ) {
    this.cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      path: '/auth/refresh',
      // domain: this.jwtConfiguration.audience.replace('https://', '.'),
      maxAge: this.jwtConfiguration.refreshTokenTtl * 1000,
    } as const;
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    this.clearTokenCookies(response);
    const tokens = await this.authService.login(loginDto);
    this.setTokenCookies(response, tokens.refreshToken);
    return { accessToken: tokens.accessToken };
  }

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken = request.cookies?.[this.REFRESH_TOKEN_COOKIE];
    const tokens = await this.authService.refreshTokens(refreshToken);
    this.setTokenCookies(response, tokens.refreshToken);
    return { accessToken: tokens.accessToken };
  }

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.OK)
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const tokens = await this.authService.register(registerDto);
    this.setTokenCookies(response, tokens.refreshToken);
    return { accessToken: tokens.accessToken };
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    this.clearTokenCookies(response);
    return { message: 'Logged out successfully' };
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  async getActiveProfile(@ActiveUser() user: ActiveUserData) {
    return await this.authService.getActiveProfile(user.email);
  }

  private setTokenCookies(response: Response, refreshToken: string): void {
    response.cookie(
      this.REFRESH_TOKEN_COOKIE,
      refreshToken,
      this.cookieOptions,
    );
  }

  private clearTokenCookies(response: Response): void {
    const refreshOptions = { ...this.cookieOptions, maxAge: 0 };
    response.clearCookie(this.REFRESH_TOKEN_COOKIE, refreshOptions);
  }
}
