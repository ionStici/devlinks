import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Invalid Email.' })
  email: string;

  @IsNotEmpty({ message: 'Password is required.' })
  password: string;
}
