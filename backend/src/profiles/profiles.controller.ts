import {
  Body,
  Controller,
  Patch,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { PatchProfileDto } from './dtos/patch-profile.dto';
import { ProfilesService } from './providers/profiles.service';
import { PatchLinksDto } from './dtos/patch-links.dto';

@Controller('profile')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Auth(AuthType.Bearer)
  @Patch('update-profile')
  @UseInterceptors(FileInterceptor('image'))
  updateProfile(
    @ActiveUser() user: ActiveUserData,
    @Body() patchProfileDto: PatchProfileDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.profilesService.updateProfile(
      user.email,
      patchProfileDto,
      image,
    );
  }

  @Auth(AuthType.Bearer)
  @Patch('update-links')
  updateLinks(
    @ActiveUser() user: ActiveUserData,
    @Body() patchLinksDto: PatchLinksDto,
  ) {
    return this.profilesService.updateLinks(user.email, patchLinksDto);
  }
}
