import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomRepository } from './room.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RoomRepository])],
  providers: [RoomService],
  controllers: [RoomController],
})
export class RoomModule {}
