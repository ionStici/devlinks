import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChangeEmailDto } from '../dtos/change-email.dto';
import { User } from '../user.entity';
import { HelpersProvider } from './helpers.provider';

@Injectable()
export class ChangeEmailProvider {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly helpers: HelpersProvider,
  ) {}

  async changeEmail(dto: ChangeEmailDto) {
    return this.helpers.wrapErrors(async () => {
      const user = await this.helpers.getAndValidate({
        email: dto.email,
        password: dto.password,
        opts: { withProfile: true },
      });

      user.email = dto.newEmail ?? user.email;

      try {
        const updated = await this.userRepo.save(user);

        return {
          user: { email: updated.email, ...user.profile },
          message: 'Email address successfully updated!',
        };
      } catch (error) {
        if (error.code === 'SQLITE_CONSTRAINT_UNIQUE')
          throw new ConflictException('Try another email.');
        throw error;
      }
    });
  }
}
