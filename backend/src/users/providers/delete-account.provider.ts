import { Injectable } from '@nestjs/common';
import { DeleteAccountDto } from '../dtos/delete-account.dto';

@Injectable()
export class DeleteAccountProvider {
  deleteAccount(dto: DeleteAccountDto) {
    console.log(dto);
  }
}
