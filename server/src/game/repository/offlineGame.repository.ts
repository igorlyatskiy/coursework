import { EntityRepository, Repository } from 'typeorm';
import { Logger } from '@nestjs/common';

import { OfflineGameEntity } from '../entity/offlineGame.entity';

@EntityRepository(OfflineGameEntity)
export class OfflineGameRepository extends Repository<OfflineGameEntity> {
  private logger = new Logger('OfflineGameRepository');

  async getGameById(id: string) {
    this.logger.log(`Getting room by id [${id}]`);

    return await this.find({
      where: {
        id,
      },
    });
  }

  async saveNewGame(game: OfflineGameEntity) {
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
