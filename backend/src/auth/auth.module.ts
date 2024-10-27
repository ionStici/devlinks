import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import jwtConfig from './config/jwt.config';
import { AuthService } from './providers/auth.service';
import { BcryptProvider } from './providers/bcrypt.provider';
import { HashingProvider } from './providers/hashing.provider';
import { GenerateTokensProvider } from './providers/generate-tokens.provider';
import { RefreshTokensProvider } from './providers/refresh-tokens.provider';
import { SignInProvider } from './providers/sign-in.provider';

@Module({
  imports: [
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    forwardRef(() => UsersModule),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    SignInProvider,
    GenerateTokensProvider,
    RefreshTokensProvider,
    {
      provide: HashingProvider,
      useClass: BcryptProvider,
    },
  ],
  exports: [AuthService, HashingProvider],
})
export class AuthModule {}
