import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AdminGuard implements CanActivate {
  private readonly logger = new Logger('CourseGuard');
  private admins: string[];

  constructor(private configService: ConfigService) {
    this.admins = this.configService.get('app.admins');
  }

  public canActivate(context: ExecutionContext) {
    const [req] = context.getArgs();
    const { user } = req;

    if (this.admins.includes(user.email)) {
      return true;
    }

    return false;
  }
}
