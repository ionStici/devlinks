import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Profile } from '../profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CreateEmptyProfileProvider {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  public async createEmptyProfile() {
    let newProfile = this.profileRepository.create({ username: uuidv4() });

    try {
      newProfile = await this.profileRepository.save(newProfile);
    } catch {
      throw new InternalServerErrorException('Operation Failed.');
    }

    return newProfile;
  }
}
