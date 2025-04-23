import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ProfilesModule } from 'src/profiles/profiles.module';
import { ChangeEmailProvider } from './providers/change-email.provider';
import { ChangePasswordProvider } from './providers/change-password.provider';
import { CreateUserProvider } from './providers/create-user.provider';
import { DeleteAccountProvider } from './providers/delete-account.provider';
import { FindUserProvider } from './providers/find-user.provider';
import { UsersService } from './providers/users.service';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { HelpersProvider } from './providers/helpers.provider';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    CreateUserProvider,
    FindUserProvider,
    ChangeEmailProvider,
    ChangePasswordProvider,
    DeleteAccountProvider,
    HelpersProvider,
  ],
  imports: [
    forwardRef(() => AuthModule),
    ProfilesModule,
    TypeOrmModule.forFeature([User]),
  ],
  exports: [UsersService],
})
export class UsersModule {}
