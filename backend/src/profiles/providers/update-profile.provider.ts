import {
  HttpException,
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
    private readonly profileRepository: Repository<Profile>,
  ) {}

  public async updateProfile(email: string, patchProfileDto: PatchProfileDto) {
    const queryRunner =
      this.profileRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const profile = await queryRunner.manager.findOne(Profile, {
        where: { user: { email } },
      });

      if (!profile) {
        throw new NotFoundException('Profile not found');
      }

      profile.username = patchProfileDto.username ?? profile.username;
      profile.name = patchProfileDto.name ?? profile.name;
      profile.about = patchProfileDto.about ?? profile.about;
      profile.image = patchProfileDto.image ?? profile.image;

      const updatedProfile = await queryRunner.manager.save(Profile, profile);
      await queryRunner.commitTransaction();

      return {
        user: { email, ...updatedProfile },
        message: 'Your changes have been successfully saved!',
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Failed to update profile');
    } finally {
      await queryRunner.release();
    }
  }
}
