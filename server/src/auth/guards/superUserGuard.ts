import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SuperUserGuard implements CanActivate {
  private readonly logger = new Logger('SuperUserGuard');
  private superUsers: string[];

  constructor(private configService: ConfigService) {
    this.superUsers = this.configService.get('app.superUsers');
  }

  public canActivate(context: ExecutionContext) {
    const [req] = context.getArgs();
    const { user } = req;

    if (this.superUsers.includes(user.email)) {
      return true;
    }

    return false;
  }
}
