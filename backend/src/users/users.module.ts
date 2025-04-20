import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ProfilesModule } from 'src/profiles/profiles.module';
import { CreateUserProvider } from './providers/create-user.provider';
import { FindUserProvider } from './providers/find-user.provider';
import { UsersService } from './providers/users.service';
import { User } from './user.entity';

@Module({
  providers: [UsersService, CreateUserProvider, FindUserProvider],
  imports: [
    forwardRef(() => AuthModule),
    ProfilesModule,
    TypeOrmModule.forFeature([User]),
  ],
  exports: [UsersService],
})
export class UsersModule {}
