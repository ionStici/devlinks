import { IsEmail, Matches } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Wrong email format.' })
  email: string;

  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,96}$/,
    {
      message:
        'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.',
    },
  )
  password: string;
}
