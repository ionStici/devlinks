import { Body, Controller, Patch } from '@nestjs/common';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { PatchLinksDto } from './dtos/patch-links.dto';
import { PatchProfileDto } from './dtos/patch-profile.dto';
import { ProfilesService } from './providers/profiles.service';

@Controller('profile')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Patch('update-profile')
  updateProfile(
    @ActiveUser() user: ActiveUserData,
    @Body() patchProfileDto: PatchProfileDto,
  ) {
    return this.profilesService.updateProfile(user.email, patchProfileDto);
  }

  @Patch('update-links')
  updateLinks(
    @ActiveUser() user: ActiveUserData,
    @Body() patchLinksDto: PatchLinksDto,
  ) {
    return this.profilesService.updateLinks(user.email, patchLinksDto);
  }
}
