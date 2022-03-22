import { EntityRepository, Repository } from 'typeorm';
import { Logger } from '@nestjs/common';

import { AiGameEntity } from '../entity/aiGame.entity';

@EntityRepository(AiGameEntity)
export class AiGameRepository extends Repository<AiGameEntity> {
  private logger = new Logger('OfflineGameRepository');

  async getGameById(id: string) {
    this.logger.log(`Getting room by id [${id}]`);

    return await this.find({
      where: {
        id,
      },
    });
  }

  async saveNewGame(game: AiGameEntity) {
    await this.save(game);
  }

  async setWinner(gameId: string, winnerColor: 'w' | 'b') {
    return this.update(
      {
        id: gameId,
      },
      {
        winnerColor,
      },
    );
  }
}
