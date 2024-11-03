import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { ProfilesService } from './providers/profiles.service';
import { CreateEmptyProfileProvider } from './providers/create-empty-profile.provider';
import { GetProfileProvider } from './providers/get-profile.provider';
import { User } from 'src/users/user.entity';
import { UpdateProfileProvider } from './providers/update-profile.provider';
import { ProfilesController } from './profiles.controller';
import { UploadsModule } from 'src/uploads/uploads.module';
import { UpdateLinksProvider } from './providers/update-links.provider';

@Module({
  controllers: [ProfilesController],
  imports: [TypeOrmModule.forFeature([Profile, User]), UploadsModule],
  providers: [
    ProfilesService,
    CreateEmptyProfileProvider,
    GetProfileProvider,
    UpdateProfileProvider,
    UpdateLinksProvider,
  ],
  exports: [ProfilesService],
})
export class ProfilesModule {}
