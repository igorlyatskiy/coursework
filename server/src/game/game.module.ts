import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GameService } from './game.service';
import { GameGateway } from './game.gateway';
import { GameRepository } from './game.repository';

@Module({
  imports: [TypeOrmModule.forFeature([GameRepository])],
  controllers: [],
  providers: [GameService, GameGateway],
})
export class GameModule {}
