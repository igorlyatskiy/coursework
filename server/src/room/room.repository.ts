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
    return room.save();
  }

  async getRoomById(roomId: string) {
    const data = await this.findOne({
      where: { id: roomId },
      relations: ['creator'],
    });
    return data;
  }

  async getAll() {
    const data = await this.find({
      where: { isRoomActive: true },
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

  async deleteById(roomId: string) {
    await this.delete({ id: roomId });
  }

  async updateRoom(roomId: string, newRoom: RoomEntity) {
    await this.update(
      {
        id: roomId,
      },
      newRoom,
    );
  }
}
