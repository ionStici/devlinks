import { IsEmail, Length } from 'class-validator';

export class ChangePasswordDto {
  @IsEmail()
  email: string;

  @Length(8, 96, { message: 'Password must be between 8-96 characters.' })
  password: string;

  @Length(8, 96, { message: 'Password must be between 8-96 characters.' })
  newPassword: string;
}
