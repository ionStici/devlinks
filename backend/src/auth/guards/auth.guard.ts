import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthType } from '../enums/auth-type.enum';
import { AccessTokenGuard } from './access-token.guard';
import { AUTH_TYPE_KEY } from '../constants/auth.constants';

@Injectable()
export class AuthGuard implements CanActivate {
  private static readonly defaultAuthType = AuthType.Bearer;

  private readonly authTypeGuardMap: Record<
    AuthType,
    | CanActivate
    | CanActivate[]
    | { canActivate: () => boolean | Promise<boolean> }
  >;

  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
  ) {
    this.authTypeGuardMap = {
      [AuthType.Bearer]: this.accessTokenGuard,
      [AuthType.None]: { canActivate: () => true },
    };
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authType = this.reflector.getAllAndOverride<AuthType[]>(
      AUTH_TYPE_KEY,
      [context.getHandler(), context.getClass()],
    ) ?? [AuthGuard.defaultAuthType];

    const guards = authType.map((type) => this.authTypeGuardMap[type]).flat();

    let error = new UnauthorizedException();

    for (const guard of guards) {
      try {
        const result = await Promise.resolve(guard.canActivate(context));
        if (result) return true;
      } catch (err) {
        error = err;
      }
    }

    throw error;
  }
}
