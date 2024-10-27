import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInDto {
  @IsEmail({}, { message: 'Wrong email format.' })
  email: string;

  @IsNotEmpty({ message: 'The password is required.' })
  password: string;
}
