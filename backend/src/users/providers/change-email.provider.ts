import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { Repository } from 'typeorm';
import { ChangeEmailDto } from '../dtos/change-email.dto';
import { User } from '../user.entity';

@Injectable()
export class ChangeEmailProvider {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly hasher: HashingProvider,
  ) {}

  async changeEmail(dto: ChangeEmailDto) {
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

      user.email = dto.newEmail ?? user.email;
      const updatedUser = await this.userRepo.save(user);

      return {
        user: { email: updatedUser.email, ...user.profile },
        message: 'Email address successfully updated!',
      };
    } catch (error) {
      if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        throw new ConflictException('Email is already in use.');
      }

      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }

      throw new InternalServerErrorException('Operation failed.');
    }
  }
}
