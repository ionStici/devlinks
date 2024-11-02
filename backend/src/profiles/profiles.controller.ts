import { Body, Controller, Patch } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { PatchProfileDto } from './dtos/patch-profile.dto';
import { ProfilesService } from './providers/profiles.service';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';

@Controller('profile')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Auth(AuthType.Bearer)
  @Patch('update')
  updateProfile(
    @Body() patchProfileDto: PatchProfileDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.profilesService.updateProfile({
      email: user.email,
      ...patchProfileDto,
    });
  }
}
