import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { GameModule } from './game/game.module';
import { UserModule } from './user/user.module';

import { typeOrmConfigAsync } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { RoomModule } from './room/room.module';
import configuration from './config/index';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    GameModule,
    UserModule,
    AuthModule,
    RoomModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
