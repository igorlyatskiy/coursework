import { CanActivate, Injectable, Logger } from '@nestjs/common';

import { UserService } from '../../user/user.service';
import { JwtService } from '../jwt.service';

@Injectable()
export class WsGuard implements CanActivate {
  private readonly logger = new Logger('WsGuard');
  constructor(
    readonly userService: UserService,
    readonly jwtService: JwtService,
  ) {}

  async canActivate(context: any) {
    const data = context.switchToWs().getData();
    const JWT_TOKEN = context.args[0].handshake.headers.jwt_token;

    if (!JWT_TOKEN) {
      return false;
    }

    try {
      const userData: { email: string; id: string } =
        this.jwtService.validateToken(JWT_TOKEN);

      const user = await this.userService.getUserByEmail(userData.email);
      context.switchToWs().getData().user = user;

      return true;
    } catch (error) {
      this.logger.error(error);

      return false;
    }
  }
}
