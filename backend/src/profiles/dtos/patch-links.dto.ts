import { PickType } from '@nestjs/mapped-types';
import { CreateProfileDto } from './create-profile.dto';

export class PatchLinksDto extends PickType(CreateProfileDto, [
  'links',
] as const) {}
