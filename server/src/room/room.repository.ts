import { EntityRepository, Repository } from 'typeorm';
import { Logger } from '@nestjs/common';

import { Room } from './room.entity';

@EntityRepository(Room)
export class RoomRepository extends Repository<Room> {
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
