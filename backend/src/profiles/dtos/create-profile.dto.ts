import { Transform } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

export class CreateProfileDto {
  @Matches(/^(?=.{4,16}$)(?!.*--)[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$/, {
    message:
      'Username can contain letters, numbers, and hyphens. Cannot start/end with a hyphen. Length between 4-16 characters.',
  })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.toLowerCase() : value,
  )
  username: string;

  @IsOptional()
  @IsString()
  @MaxLength(30, { message: 'Name should not exceed 30 characters.' })
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(125, { message: 'Bio should not exceed 125 characters.' })
  about: string;

  @IsOptional()
  @IsString()
  @MaxLength(1024, { message: 'Image URL should not exceed 1024 characters.' })
  image: string;

  @IsArray()
  @ArrayMaxSize(15, { message: 'Cannot add more than 15 links' })
  @MaxLength(256, {
    each: true,
    message: 'Each link cannot exceed 256 characters',
  })
  @Matches(/^[^%]+%https?:\/\/.+$/, {
    each: true,
    message:
      'Each link must be in format "Platform%URL" where URL starts with http:// or https://',
  })
  links: string[];
}
