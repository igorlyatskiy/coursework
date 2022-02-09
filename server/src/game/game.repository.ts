import { EntityRepository, Repository } from 'typeorm';
import { Logger } from '@nestjs/common';

import { Game } from './game.entity';

@EntityRepository(Game)
export class GameRepository extends Repository<Game> {
  private logger = new Logger('UsersRepository');

  async getRoomById(id: string) {
    this.logger.log(`Getting room by id [${id}]`);

    return await this.find({
      where: {
        id,
      },
    });
  }
}
