import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'Invalid Email.' })
  email: string;

  @MaxLength(96, { message: 'Password must not exceed 96 characters.' })
  @MinLength(8, { message: 'Password must be at least 8 characters long.' })
  password: string;
}
