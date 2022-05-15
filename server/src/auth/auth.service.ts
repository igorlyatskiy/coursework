import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from './jwt.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');

  constructor(private readonly jwtService: JwtService) {}

  async validateGoogle(req: any): Promise<string> {
    if (!req.user) {
      return null;
    }

    return this.jwtService.createToken({
      id: req.user.id,
      email: req.user.email,
    });
  }
}
