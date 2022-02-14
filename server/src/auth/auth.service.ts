import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { JwtService } from './jwt.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');

  constructor(private readonly jwtService: JwtService) {}

  async validateGoogle(req: any): Promise<string> {
    this.logger.log(req.user);

    if (!req.user) {
      return null;
    }

    return this.jwtService.createToken(req.user);
  }

  createAuthUser(data: any) {
    return data;
  }
}
