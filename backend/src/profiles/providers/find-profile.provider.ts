import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from '../profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FindProfileProvider {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async findProfile(username: string) {
    try {
      const profile = await this.profileRepository.findOneBy({ username });
      if (!profile) throw new NotFoundException('User not found');
      return profile;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Operation failed.');
    }
  }
}
