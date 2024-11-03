import { Injectable } from '@nestjs/common';
import { PatchLinksDto } from '../dtos/patch-links.dto';
import { CreateEmptyProfileProvider } from './create-empty-profile.provider';
import { GetProfileProvider } from './get-profile.provider';
import { UpdateProfileProvider } from './update-profile.provider';
import { PatchProfileDto } from '../dtos/patch-profile.dto';
import { UpdateLinksProvider } from './update-links.provider';

@Injectable()
export class ProfilesService {
  constructor(
    private readonly createEmptyProfileProvider: CreateEmptyProfileProvider,
    private readonly getProfileProvider: GetProfileProvider,
    private readonly updateProfileProvider: UpdateProfileProvider,
    private readonly updateLinksProvider: UpdateLinksProvider,
  ) {}

  public async createEmptyProfile() {
    return this.createEmptyProfileProvider.createEmptyProfile();
  }

  public getProfile(email: string) {
    return this.getProfileProvider.getProfile(email);
  }

  public updateProfile(
    email: string,
    patchProfileDto: PatchProfileDto,
    image: Express.Multer.File,
  ) {
    return this.updateProfileProvider.updateProfile(
      email,
      patchProfileDto,
      image,
    );
  }

  public updateLinks(email: string, patchLinksDto: PatchLinksDto) {
    return this.updateLinksProvider.updateLinks(email, patchLinksDto);
  }
}
