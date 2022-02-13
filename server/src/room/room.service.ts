import { Injectable } from '@nestjs/common';
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

  async createRoom(roomName: string) {
    await this.roomRepository.createOne({ name: roomName });
    return this.getAllActiveRooms();
  }
}
