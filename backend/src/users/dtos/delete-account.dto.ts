import { IsEmail, Length } from 'class-validator';

export class DeleteAccountDto {
  @IsEmail()
  email: string;

  @Length(8, 96, { message: 'Invalid password.' })
  password: string;
}
