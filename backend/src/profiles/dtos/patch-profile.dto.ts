import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileDto } from './create-profile.dto';
import { IsEmail, IsOptional } from 'class-validator';

export class PatchProfileDto extends PartialType(CreateProfileDto) {
  @IsEmail()
  @IsOptional()
  email?: string;
}
