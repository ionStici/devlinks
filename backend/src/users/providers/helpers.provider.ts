import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { HashingProvider } from 'src/auth/providers/hashing.provider';

export type FindAndValidateDto = {
  email: string;
  password: string;
  opts?: { withProfile?: boolean };
};

@Injectable()
export class HelpersProvider {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly hasher: HashingProvider,
  ) {}

  public async getAndValidate({ email, password, opts }: FindAndValidateDto) {
    const findOpt: FindOneOptions<User> = {
      where: { email },
      ...(opts?.withProfile && { relations: ['profile'] }),
    };

    const user = await this.userRepo.findOne(findOpt);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!(await this.hasher.comparePassword(password, user.password))) {
      throw new BadRequestException('Incorrect password.');
    }

    return user;
  }

  public async wrapErrors<T>(fn: () => Promise<T>): Promise<T> {
    try {
      return await fn();
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      if (error instanceof BadRequestException) throw error;
      if (error instanceof ConflictException) throw error;
      throw new InternalServerErrorException('Operation failed.');
    }
  }
}
