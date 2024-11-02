import { Injectable } from '@nestjs/common';

import { CreateEmptyProfileProvider } from './create-empty-profile.provider';
import { GetProfileProvider } from './get-profile.provider';
import { UpdateProfileProvider } from './update-profile.provider';
import { PatchProfileDto } from '../dtos/patch-profile.dto';

@Injectable()
export class ProfilesService {
  constructor(
    private readonly createEmptyProfileProvider: CreateEmptyProfileProvider,
    private readonly getProfileProvider: GetProfileProvider,
    private readonly updateProfileProvider: UpdateProfileProvider,
  ) {}

  public async createEmptyProfile() {
    return this.createEmptyProfileProvider.createEmptyProfile();
  }

  public getProfile(email: string) {
    return this.getProfileProvider.getProfile(email);
  }

  public updateProfile(patchProfileDto: PatchProfileDto) {
    return this.updateProfileProvider.updateProfile(patchProfileDto);
  }
}
