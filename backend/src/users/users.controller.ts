import { Body, Controller, Delete, Patch } from '@nestjs/common';
import { UsersService } from './providers/users.service';
import { ChangeEmailDto } from './dtos/change-email.dto';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { DeleteAccountDto } from './dtos/delete-account.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch('email')
  changeEmail(@Body() dto: ChangeEmailDto) {
    return this.usersService.changeEmail(dto);
  }

  @Patch('password')
  changePassword(@Body() dto: ChangePasswordDto) {
    return this.usersService.changePassword(dto);
  }

  @Delete()
  deleteAccount(@Body() dto: DeleteAccountDto) {
    return this.usersService.deleteAccount(dto);
  }
}
