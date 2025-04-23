import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { Repository } from 'typeorm';
import { DeleteAccountDto } from '../dtos/delete-account.dto';
import { User } from '../user.entity';
import { Profile } from 'src/profiles/profile.entity';

@Injectable()
export class DeleteAccountProvider {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly hasher: HashingProvider,
  ) {}

  async deleteAccount(dto: DeleteAccountDto) {
    try {
      const user = await this.userRepo.findOne({
        where: { email: dto.email },
        relations: ['profile'],
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (!(await this.hasher.comparePassword(dto.password, user.password))) {
        throw new BadRequestException('Incorrect password.');
      }

      await this.userRepo.manager.transaction(async (manager) => {
        await manager.delete(Profile, { id: user.profile.id });
        await manager.delete(User, { id: user.id });
      });

      return { message: 'Account successfully and permanently deleted!' };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException('Operation failed.');
    }
  }
}
