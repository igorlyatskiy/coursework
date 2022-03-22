import {
  Controller,
  Get,
  Logger,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger('AuthController');
  private readonly JWT_COOKIE_NAME: string;
  private readonly CLIENT_URI: string;

  constructor(
    private readonly authService: AuthService,
    private configService: ConfigService,
  ) {
    this.JWT_COOKIE_NAME = this.configService.get('auth.jwt.cookieName');
    this.CLIENT_URI = this.configService.get('app.client.uri');
  }

  @Get('google/login')
  @UseGuards(AuthGuard('google'))
  async login() {}

  @Get('/google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    const token = await this.authService.validateGoogle(req);
    res.cookie(this.JWT_COOKIE_NAME, token);
    res.redirect(this.CLIENT_URI);
  }

  @Get('google/logout')
  googleLogout(@Res() res) {
    res.clearCookie(this.JWT_COOKIE_NAME);
    res.redirect(this.CLIENT_URI);
  }

  @Get('session')
  @UseGuards(AuthGuard('jwt'))
  getSession(@Req() req) {
    const { user } = req;

    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar,
      username: user.username,
      userId: user.id,
    };
  }
}
