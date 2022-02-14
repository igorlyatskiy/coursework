import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { RoomService } from './room.service';

@Controller()
@UseGuards(AuthGuard('jwt'))
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
