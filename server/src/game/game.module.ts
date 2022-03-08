import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GameService } from './game.service';
import { GameGateway } from './game.gateway';
import { GameRepository } from './game.repository';
import { RoomModule } from '../room/room.module';

@Module({
  imports: [TypeOrmModule.forFeature([GameRepository]), RoomModule],
  controllers: [],
  providers: [GameService, GameGateway],
})
export class GameModule {}
