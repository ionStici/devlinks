import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PatchLinksDto } from '../dtos/patch-links.dto';
import { PatchProfileDto } from '../dtos/patch-profile.dto';
import { Profile } from '../profile.entity';
import { CreateEmptyProfileProvider } from './create-empty-profile.provider';
import { FindProfileProvider } from './find-profile.provider';
import { UpdateLinksProvider } from './update-links.provider';
import { UpdateProfileProvider } from './update-profile.provider';
import { FindProfilesProvider } from './find-profiles.provider';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    private readonly createEmptyProfileProvider: CreateEmptyProfileProvider,
    private readonly updateProfileProvider: UpdateProfileProvider,
    private readonly updateLinksProvider: UpdateLinksProvider,
    private readonly findProfileProvider: FindProfileProvider,
    private readonly findProfilesProvider: FindProfilesProvider,
  ) {}

  public findProfiles() {
    return this.findProfilesProvider.findProfiles();
  }

  public findProfile(username: string) {
    return this.findProfileProvider.findProfile(username);
  }

  public createEmptyProfile() {
    return this.createEmptyProfileProvider.createEmptyProfile();
  }

  public getProfileByEmail(email: string) {
    return this.profileRepository.findOne({ where: { user: { email } } });
  }

  public updateProfile(email: string, patchProfileDto: PatchProfileDto) {
    return this.updateProfileProvider.updateProfile(email, patchProfileDto);
  }

  public updateLinks(email: string, patchLinksDto: PatchLinksDto) {
    return this.updateLinksProvider.updateLinks(email, patchLinksDto);
  }
}
