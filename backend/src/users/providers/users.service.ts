import { Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/auth/dtos/register.dto';
import { ChangeEmailDto } from '../dtos/change-email.dto';
import { ChangePasswordDto } from '../dtos/change-password.dto';
import { DeleteAccountDto } from '../dtos/delete-account.dto';
import { ChangeEmailProvider } from './change-email.provider';
import { ChangePasswordProvider } from './change-password.provider';
import { CreateUserProvider } from './create-user.provider';
import { DeleteAccountProvider } from './delete-account.provider';
import { FindUserDto, FindUserProvider } from './find-user.provider';

@Injectable()
export class UsersService {
  constructor(
    private readonly createUserProvider: CreateUserProvider,
    private readonly findUserProvider: FindUserProvider,
    private readonly changeEmailProvider: ChangeEmailProvider,
    private readonly changePasswordProvider: ChangePasswordProvider,
    private readonly deleteAccountProvider: DeleteAccountProvider,
  ) {}

  public createUser(createUserDto: RegisterDto) {
    return this.createUserProvider.createUser(createUserDto);
  }

  public findUser(findUserDto: FindUserDto) {
    return this.findUserProvider.findUser(findUserDto);
  }

  public changeEmail(dto: ChangeEmailDto) {
    return this.changeEmailProvider.changeEmail(dto);
  }

  public changePassword(dto: ChangePasswordDto) {
    return this.changePasswordProvider.changePassword(dto);
  }

  public deleteAccount(dto: DeleteAccountDto) {
    return this.deleteAccountProvider.deleteAccount(dto);
  }
}
