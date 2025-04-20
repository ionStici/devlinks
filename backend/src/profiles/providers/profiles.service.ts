import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PatchLinksDto } from '../dtos/patch-links.dto';
import { PatchProfileDto } from '../dtos/patch-profile.dto';
import { Profile } from '../profile.entity';
import { CreateEmptyProfileProvider } from './create-empty-profile.provider';
import { UpdateLinksProvider } from './update-links.provider';
import { UpdateProfileProvider } from './update-profile.provider';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    private readonly createEmptyProfileProvider: CreateEmptyProfileProvider,
    private readonly updateProfileProvider: UpdateProfileProvider,
    private readonly updateLinksProvider: UpdateLinksProvider,
  ) {}

  public async createEmptyProfile() {
    return this.createEmptyProfileProvider.createEmptyProfile();
  }

  public async getProfileByEmail(email: string) {
    return await this.profileRepository.findOne({ where: { user: { email } } });
  }

  public updateProfile(email: string, patchProfileDto: PatchProfileDto) {
    return this.updateProfileProvider.updateProfile(email, patchProfileDto);
  }

  public updateLinks(email: string, patchLinksDto: PatchLinksDto) {
    return this.updateLinksProvider.updateLinks(email, patchLinksDto);
  }
}
