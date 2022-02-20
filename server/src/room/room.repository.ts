import { EntityRepository, Repository } from 'typeorm';
import { Logger } from '@nestjs/common';

import { RoomEntity } from './room.entity';
import { UserEntity } from '../user/user.entity';

@EntityRepository(RoomEntity)
export class RoomRepository extends Repository<RoomEntity> {
  private logger = new Logger('RoomRepository');

  async createOne({
    name,
    authorEmail,
  }: {
    name: string;
    authorEmail: string;
  }) {
    const creator = await UserEntity.findOne({
      where: {
        email: authorEmail,
      },
    });
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
      playerName:
        item.creator?.username ??
        `${item.creator?.firstName} ${item.creator?.lastName}`,
    }));
  }
}
