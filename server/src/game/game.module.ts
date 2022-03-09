import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GameService } from './game.service';
import { GameGateway } from './game.gateway';
import { GameRepository } from './game.repository';
import { RoomModule } from '../room/room.module';
import { RoomRepository } from '../room/room.repository';
import { UserRepository } from '../user/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([GameRepository, RoomRepository, UserRepository]),
    RoomModule,
  ],
  controllers: [],
  providers: [GameService, GameGateway],
})
export class GameModule {}
