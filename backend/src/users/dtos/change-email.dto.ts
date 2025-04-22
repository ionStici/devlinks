import { IsEmail, Length } from 'class-validator';

export class ChangeEmailDto {
  @IsEmail()
  email: string;

  @IsEmail()
  newEmail: string;

  @Length(8, 96, { message: 'Password must be between 8-96 characters.' })
  password: string;
}
