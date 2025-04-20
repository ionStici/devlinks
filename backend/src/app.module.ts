import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
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
})
export class AppModule {}
