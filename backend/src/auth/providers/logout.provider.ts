import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { TokenBlacklist } from '../token-blacklist.entity';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class LogoutProvider {
  constructor(
    @InjectRepository(TokenBlacklist)
    private readonly tokenBlacklistRepository: Repository<TokenBlacklist>,
    private readonly jwtService: JwtService,
  ) {}

  public async logout(refreshToken: string) {
    const isBlacklisted = await this.isTokenBlacklisted(refreshToken);
    if (isBlacklisted) return;

    try {
      const { exp } = this.jwtService.decode(refreshToken);

      const blacklistedToken = this.tokenBlacklistRepository.create({
        token: refreshToken,
        expiresAt: new Date(exp * 1000),
      });

      await this.tokenBlacklistRepository.save(blacklistedToken);
    } catch {
      throw new UnauthorizedException('Logout failed');
    }
  }

  public async isTokenBlacklisted(refreshToken: string): Promise<boolean> {
    const blacklistedToken = await this.tokenBlacklistRepository.findOne({
      where: { token: refreshToken },
    });
    return !!blacklistedToken;
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async cleanupExpiredTokens(): Promise<void> {
    await this.tokenBlacklistRepository.delete({
      expiresAt: LessThan(new Date()),
    });
  }
}
