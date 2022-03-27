import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class UserGuard implements CanActivate {
  private readonly logger = new Logger('UserGuard');

  public canActivate(context: ExecutionContext) {
    const [req] = context.getArgs();
    const { user } = req;

    if (!user) {
      throw new UnauthorizedException();
    }

    if (!user.isActive) {
      throw new ForbiddenException('User is inactive');
    }

    return true;
  }
}
