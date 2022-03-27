import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

import { JwtService } from '../jwt.service';
import { UserService } from '../../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  private readonly JWT_COOKIE_NAME: string;
  private readonly logger = new Logger('JwtStrategy');

  constructor(
    private authService: JwtService,
    private configService: ConfigService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: (req: Request) => req.cookies?.[this.JWT_COOKIE_NAME],
      ignoreExpiration: false,
      secretOrKey: configService.get('auth.jwt.secret'),
    });
    this.JWT_COOKIE_NAME = this.configService.get('auth.jwt.cookieName');
  }

  public async validate(payload: { email: string }): Promise<any> {
    const user = await this.userService.getUserByEmail(payload.email);
    if (!user) {
      throw new UnauthorizedException();
    }
    return {
      ...user,
      isSuperUser: this.configService
        .get('app.superUsers')
        .includes(user.email),
    };
  }
}
