import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export type FindUserDto = { id?: string; email?: string };

@Injectable()
export class FindUserProvider {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findUser({ id, email }: FindUserDto) {
    const where = id ? { id } : email ? { email } : undefined;

    if (!where) {
      throw new BadRequestException('Missing search parameters');
    }

    let user: undefined | User = undefined;

    try {
      user = await this.userRepository.findOne({ where });
    } catch {
      throw new InternalServerErrorException('Operation Failed.');
    }

    if (!user) {
      throw new NotFoundException('User does not exist.');
    }

    return user;
  }
}
