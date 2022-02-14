import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { JwtService } from '../jwt.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  private readonly JWT_COOKIE_NAME: string;
  private readonly logger = new Logger('JwtStrategy');

  constructor(
    private authService: JwtService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: (req: Request) => req.cookies?.[this.JWT_COOKIE_NAME],
      ignoreExpiration: false,
      secretOrKey: configService.get('auth.jwt.secret'),
    });
    this.JWT_COOKIE_NAME = this.configService.get('auth.jwt.cookieName');
  }

  public async validate(payload: any): Promise<any> {
    this.logger.debug(payload);
    return payload;
  }
}
