import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { ProfilesController } from './profiles.controller';
import { CreateEmptyProfileProvider } from './providers/create-empty-profile.provider';
import { FindProfileProvider } from './providers/find-profile.provider';
import { ProfilesService } from './providers/profiles.service';
import { UpdateLinksProvider } from './providers/update-links.provider';
import { UpdateProfileProvider } from './providers/update-profile.provider';
import { FindProfilesProvider } from './providers/find-profiles.provider';

@Module({
  controllers: [ProfilesController],
  imports: [TypeOrmModule.forFeature([Profile])],
  providers: [
    ProfilesService,
    CreateEmptyProfileProvider,
    UpdateProfileProvider,
    UpdateLinksProvider,
    FindProfileProvider,
    FindProfilesProvider,
  ],
  exports: [ProfilesService],
})
export class ProfilesModule {}
