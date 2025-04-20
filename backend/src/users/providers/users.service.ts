import { Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/auth/dtos/register.dto';
import { CreateUserProvider } from './create-user.provider';
import { FindUserDto, FindUserProvider } from './find-user.provider';

@Injectable()
export class UsersService {
  constructor(
    private readonly createUserProvider: CreateUserProvider,
    private readonly findUserProvider: FindUserProvider,
  ) {}

  public createUser(createUserDto: RegisterDto) {
    return this.createUserProvider.createUser(createUserDto);
  }

  public findUser(findUserDto: FindUserDto) {
    return this.findUserProvider.findUser(findUserDto);
  }
}
