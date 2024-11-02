import { Injectable } from '@nestjs/common';
import { PatchProfileDto } from '../dtos/patch-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from '../profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UpdateProfileProvider {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  public async updateProfile(patchProfileDto: PatchProfileDto) {
    // this.profileRepository.findOne()
    console.log(patchProfileDto);
  }
}
