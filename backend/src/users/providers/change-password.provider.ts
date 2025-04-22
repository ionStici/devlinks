import { Injectable } from '@nestjs/common';
import { ChangePasswordDto } from '../dtos/change-password.dto';

@Injectable()
export class ChangePasswordProvider {
  changePassword(dto: ChangePasswordDto) {
    console.log(dto);
  }
}
