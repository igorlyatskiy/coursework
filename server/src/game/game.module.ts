import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GameService } from './game.service';
import { GameGateway } from './game.gateway';
import { GameRepository } from './game.repository';
import { RoomModule } from '../room/room.module';
import { RoomRepository } from '../room/room.repository';
import { UserRepository } from '../user/user.repository';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([GameRepository, RoomRepository, UserRepository]),
    RoomModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [GameService, GameGateway],
})
export class GameModule {}
