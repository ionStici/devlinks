import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from '../profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FindProfilesProvider {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  public async findProfiles() {
    const profiles = await this.profileRepository.find({
      select: { username: true },
    });

    if (!profiles) {
      throw new NotFoundException('No profiles found');
    }

    return profiles.map((profile) => profile.username);
  }
}
