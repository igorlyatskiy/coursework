import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { RoomRepository } from './room.repository';
import { UserEntity } from '../user/user.entity';
import { RoomEntity } from './room.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(RoomRepository) private roomRepository: RoomRepository,
  ) {}

  async getRoomById(roomId: string) {
    return this.roomRepository.getRoomById(roomId);
  }

  async getAllActiveRooms() {
    return this.roomRepository.getAll();
  }

  async createRoom(roomName: string, authorEmail: string) {
    const newRoom = await this.roomRepository.createOne({
      name: roomName,
      authorEmail,
    });
    const rooms = await this.getAllActiveRooms();
    return {
      rooms,
      newRoomId: newRoom?.id,
    };
  }

  async deleteRoom(roomId: string) {
    await this.roomRepository.deleteById(roomId);
  }

  async updateRoom(roomId: string, room: RoomEntity) {
    await this.roomRepository.updateRoom(roomId, room);
  }
}
