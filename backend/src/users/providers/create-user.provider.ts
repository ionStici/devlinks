import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../user.entity';
import { HashingProvider } from 'src/auth/providers/hashing.provider';

@Injectable()
export class CreateUserProvider {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashingProvider: HashingProvider,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    let existingUser: User | undefined = undefined;

    try {
      existingUser = await this.userRepository.findOneBy({
        email: createUserDto.email,
      });
    } catch {
      throw new InternalServerErrorException('Operation Failed.');
    }

    if (existingUser) {
      throw new ConflictException(
        'The Email is already in use, try a different email address.',
      );
    }

    let newUser = this.userRepository.create({
      ...createUserDto,
      password: await this.hashingProvider.hashPassword(createUserDto.password),
    });

    try {
      newUser = await this.userRepository.save(newUser);
    } catch {
      throw new InternalServerErrorException('Operation Failed.');
    }

    return newUser;
  }
}
