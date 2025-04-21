import { MaxLength } from 'class-validator';

export class FindProfileDto {
  @MaxLength(16, {
    message: 'Usernames must be shorter than or equal to 16 characters',
  })
  username: string;
}
