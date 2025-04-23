import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/profiles/profile.entity';
import { Repository } from 'typeorm';
import { DeleteAccountDto } from '../dtos/delete-account.dto';
import { User } from '../user.entity';
import { HelpersProvider } from './helpers.provider';

@Injectable()
export class DeleteAccountProvider {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly helpers: HelpersProvider,
  ) {}

  async deleteAccount(dto: DeleteAccountDto) {
    return this.helpers.wrapErrors(async () => {
      const user = await this.helpers.getAndValidate({
        email: dto.email,
        password: dto.password,
        opts: { withProfile: true },
      });

      await this.userRepo.manager.transaction(async (m) => {
        await m.delete(Profile, { id: user.profile.id });
        await m.delete(User, { id: user.id });
      });

      return { message: 'Account successfully and permanently deleted!' };
    });
  }
}
