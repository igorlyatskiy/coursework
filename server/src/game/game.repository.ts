import { EntityRepository, Repository } from 'typeorm';
import { Logger } from '@nestjs/common';

import { GameEntity } from './game.entity';

@EntityRepository(GameEntity)
export class GameRepository extends Repository<GameEntity> {
  private logger = new Logger('GameRepository');

  async getGameById(id: string) {
    this.logger.log(`Getting room by id [${id}]`);

    return await this.find({
      where: {
        id,
      },
    });
  }

  async saveNewGame(game: GameEntity) {
    await this.save(game);
  }
}
