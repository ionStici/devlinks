import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PatchLinksDto } from '../dtos/patch-links.dto';
import { Profile } from '../profile.entity';

@Injectable()
export class UpdateLinksProvider {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  public async updateLinks(email: string, patchLinksDto: PatchLinksDto) {
    try {
      const profile = await this.profileRepository.findOne({
        where: { user: { email } },
      });

      if (!profile) {
        throw new NotFoundException('Profile not found');
      }

      profile.links = patchLinksDto.links ?? profile.links;
      await this.profileRepository.save(profile);

      return {
        links: profile.links,
        message: 'Your changes have been successfully saved!',
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to update links');
    }
  }
}
