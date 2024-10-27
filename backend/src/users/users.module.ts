import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './providers/users.service';
import { CreateUserProvider } from './providers/create-user.provider';
import { FindUserByEmailProvider } from './providers/find-user-by-email.provider';
import { FindUserByIdProvider } from './providers/find-user-by-id.provider';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [
    UsersService,
    CreateUserProvider,
    FindUserByEmailProvider,
    FindUserByIdProvider,
  ],
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
  exports: [UsersService],
})
export class UsersModule {}
