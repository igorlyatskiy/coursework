import { Injectable, Logger } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtService {
  private readonly logger = new Logger('JwtService');
  private readonly secretKey: string;
  private readonly expirationTime: number;

  constructor(readonly configService: ConfigService) {
    this.secretKey = this.configService.get('auth.jwt.secret');
    this.expirationTime = this.configService.get('auth.jwt.exp');
  }

  public createToken(payload: any) {
    const jwt: string = sign(
      JSON.parse(JSON.stringify(payload)),
      this.secretKey,
      { expiresIn: this.expirationTime },
    );
    return jwt;
  }

  public validateToken<T>(token: string): T {
    return verify(token, this.secretKey) as T;
  }
}
