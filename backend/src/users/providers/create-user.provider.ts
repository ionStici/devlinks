import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { ProfilesService } from 'src/profiles/providers/profiles.service';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { RegisterDto } from 'src/auth/dtos/register.dto';

@Injectable()
export class CreateUserProvider {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashingProvider: HashingProvider,
    private readonly profilesService: ProfilesService,
  ) {}

  public async createUser(registerDto: RegisterDto) {
    let existingUser: User | undefined = undefined;

    try {
      existingUser = await this.userRepository.findOneBy({
        email: registerDto.email,
      });
    } catch {
      throw new InternalServerErrorException('Operation Failed.');
    }

    if (existingUser) {
      throw new ConflictException(
        'The Email is already in use, try a different email address.',
      );
    }

    const newProfile = await this.profilesService.createEmptyProfile();

    let newUser = this.userRepository.create({
      ...registerDto,
      password: await this.hashingProvider.hashPassword(registerDto.password),
      profile: newProfile,
    });

    try {
      newUser = await this.userRepository.save(newUser);
    } catch {
      throw new InternalServerErrorException('User Registration Failed.');
    }

    return newUser;
  }
}
