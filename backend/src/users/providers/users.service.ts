import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { CreateUserProvider } from './create-user.provider';
import { FindUserByEmailProvider } from './find-user-by-email.provider';
import { FindUserByIdProvider } from './find-user-by-id.provider';

@Injectable()
export class UsersService {
  constructor(
    private readonly createUserProvider: CreateUserProvider,
    private readonly findUserByEmailProvider: FindUserByEmailProvider,
    private readonly findUserByIdProvider: FindUserByIdProvider,
  ) {}

  public createUser(createUserDto: CreateUserDto) {
    return this.createUserProvider.createUser(createUserDto);
  }

  public findUserByEmail(email: string) {
    return this.findUserByEmailProvider.findUserByEmail(email);
  }

  public findUserById(id: number) {
    return this.findUserByIdProvider.findUserById(id);
  }
}
