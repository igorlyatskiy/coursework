import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { RoomService } from './room.service';
import { UserGuard } from '../auth/guards/user.guard';

@Controller()
@UseGuards(AuthGuard('jwt'), UserGuard)
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get('rooms')
  getAllActiveRooms() {
    return this.roomService.getAllActiveRooms();
  }

  @Post('rooms')
  createRoom(@Body('name') roomName: string, @Req() req) {
    return this.roomService.createRoom(roomName, req.user.email);
  }

  // Not in use now.
  @Delete('rooms/:roomId')
  deleteRoom(@Req() req) {
    return this.roomService.deleteRoom(req.params?.roomId);
  }
}
