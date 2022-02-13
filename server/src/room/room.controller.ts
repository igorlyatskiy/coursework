import { Body, Controller, Get, Post } from '@nestjs/common';

import { RoomService } from './room.service';

@Controller()
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get('rooms')
  getAllActiveRooms() {
    return this.roomService.getAllActiveRooms();
  }

  @Post('rooms')
  createRoom(@Body('name') roomName: string) {
    return this.roomService.createRoom(roomName);
  }
}
