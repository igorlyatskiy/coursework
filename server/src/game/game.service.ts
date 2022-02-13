import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameRepository } from './game.repository';

@Injectable()
export class GameService {
  private logger = new Logger('GameService');
  constructor(
    @InjectRepository(GameRepository) private gameRepository: GameRepository,
  ) {}

  async checkGameStatus(gameId: string) {
    const room = await this.gameRepository.getRoomById(gameId);
    return !!room;
  }
}
