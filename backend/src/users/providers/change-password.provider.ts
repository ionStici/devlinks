import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ChangePasswordDto } from '../dtos/change-password.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { HashingProvider } from 'src/auth/providers/hashing.provider';

@Injectable()
export class ChangePasswordProvider {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly hasher: HashingProvider,
  ) {}

  async changePassword(dto: ChangePasswordDto) {
    try {
      const user = await this.userRepo.findOneBy({ email: dto.email });
      if (!user) throw new NotFoundException('User not found');

      if (!(await this.hasher.comparePassword(dto.password, user.password))) {
        throw new BadRequestException('Incorrect password.');
      }

      user.password = await this.hasher.hashPassword(dto.newPassword);
      await this.userRepo.save(user);

      return { message: 'Password successfully updated!' };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException('Operation failed.');
    }
  }
}
