import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { RoomRepository } from './room.repository';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(RoomRepository) private roomRepository: RoomRepository,
  ) {}

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
}
