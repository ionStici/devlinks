import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/guards/auth.guard';
import { appConfig } from './config/app.config';
import { dbConfig } from './config/db.config';
import { ProfilesModule } from './profiles/profiles.module';
import { UsersModule } from './users/users.module';

const modules = [AuthModule, UsersModule, ProfilesModule];

@Module({
  imports: [
    ...modules,
    ConfigModule.forRoot(appConfig),
    TypeOrmModule.forRoot(dbConfig),
  ],
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
