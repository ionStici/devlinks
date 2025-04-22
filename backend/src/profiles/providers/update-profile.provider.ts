import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PatchProfileDto } from '../dtos/patch-profile.dto';
import { Profile } from '../profile.entity';

@Injectable()
export class UpdateProfileProvider {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepo: Repository<Profile>,
  ) {}

  public async updateProfile(email: string, patchProfileDto: PatchProfileDto) {
    const { username, name, about, image } = patchProfileDto;

    try {
      const profile = await this.profileRepo.findOneBy({ user: { email } });
      if (!profile) throw new NotFoundException('Profile not found');

      profile.username = username ?? profile.username;
      profile.name = name ?? profile.name;
      profile.about = about ?? profile.about;
      profile.image = image ?? profile.image;

      const updatedProfile = await this.profileRepo.save(profile);

      return {
        user: { email, ...updatedProfile },
        message: 'Your changes have been successfully saved!',
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to update profile');
    }
  }
}
