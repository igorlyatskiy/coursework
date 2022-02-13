import { EntityRepository, Repository } from 'typeorm';
import { Logger } from '@nestjs/common';

import { RoomEntity } from './room.entity';
import { UserEntity } from '../user/user.entity';

@EntityRepository(RoomEntity)
export class RoomRepository extends Repository<RoomEntity> {
  private logger = new Logger('RoomRepository');

  async createOne({ name }: { name: string }) {
    let creator = null;
    if (process.env.DEBUG === 'true') {
      creator = await UserEntity.findOne({
        where: {
          username: 'igorlyatskiy',
        },
      });
    }
    const room = new RoomEntity(name, creator);
    await room.save();
  }

  async getAll() {
    const data = await this.find({
      where: { status: true },
      relations: ['creator'],
    });
    return data.map((item, index) => ({
      key: index,
      title: item.name,
      levels: item.creator?.levels ?? [],
      roomId: item.id,
      playerName: item.creator?.username ?? 'anonymous',
    }));
  }
}
