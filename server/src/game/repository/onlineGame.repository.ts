import { EntityRepository, Repository } from 'typeorm';
import { Logger } from '@nestjs/common';

import { OnlineGameEntity } from '../entity/onlineGame.entity';
import { UserEntity } from '../../user/user.entity';

@EntityRepository(OnlineGameEntity)
export class OnlineGameRepository extends Repository<OnlineGameEntity> {
  private logger = new Logger('OnlineGameRepository');

  async getGameById(id: string) {
    this.logger.log(`Getting room by id [${id}]`);

    return await this.find({
      where: {
        id,
      },
    });
  }

  async saveNewGame(game: OnlineGameEntity) {
    await this.save(game);
  }

  async setWinner(gameId: string, winner: UserEntity, isDraw: boolean) {
    return this.update(
      {
        id: gameId,
      },
      {
        winner,
        isDraw,
      },
    );
  }
}
