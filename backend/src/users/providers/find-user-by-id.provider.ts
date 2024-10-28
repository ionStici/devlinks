import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FindUserByIdProvider {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async findUserById(id: number): Promise<User> {
    let user: undefined | User = undefined;

    try {
      user = await this.userRepository.findOneBy({ id });
    } catch {
      throw new InternalServerErrorException('Operation Failed.');
    }

    if (!user) {
      throw new NotFoundException('User does not exist.');
    }

    return user;
  }
}
