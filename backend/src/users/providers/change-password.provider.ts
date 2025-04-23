import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { Repository } from 'typeorm';
import { ChangePasswordDto } from '../dtos/change-password.dto';
import { User } from '../user.entity';
import { HelpersProvider } from './helpers.provider';

@Injectable()
export class ChangePasswordProvider {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly helpers: HelpersProvider,
    private readonly hasher: HashingProvider,
  ) {}

  async changePassword(dto: ChangePasswordDto) {
    return this.helpers.wrapErrors(async () => {
      const user = await this.helpers.getAndValidate({
        email: dto.email,
        password: dto.password,
      });

      user.password = await this.hasher.hashPassword(dto.newPassword);
      await this.userRepo.save(user);

      return { message: 'Password successfully updated!' };
    });
  }
}
