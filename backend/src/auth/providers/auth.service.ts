import { Injectable } from '@nestjs/common';
import { SignInProvider } from './sign-in.provider';
import { SignInDto } from '../dtos/sign-in.dto';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(private readonly signInProvider: SignInProvider) {}

  public signIn(signInDto: SignInDto, res: Response) {
    return this.signInProvider.signIn(signInDto, res);
  }
}
