import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FindUserByEmailProvider {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async findUserByEmail(email: string): Promise<User> {
    let user: undefined | User = undefined;

    try {
      user = await this.userRepository.findOneBy({ email });
    } catch {
      throw new InternalServerErrorException('Operation Failed.');
    }

    if (!user) {
      throw new NotFoundException('User does not exist.');
    }

    return user;
  }
}
