import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtService } from './jwt.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, JwtStrategy, JwtService],
})
export class AuthModule {}
