import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Invalid email format.' })
  email: string;

  @MaxLength(96, { message: 'The max password length is 96' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;
}

// @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,96}$/,{message:'Passwords must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.',},)
