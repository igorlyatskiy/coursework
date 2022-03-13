import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger, UseGuards } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

import { GameService } from './game.service';
import { RoomService } from '../room/room.service';
import { WsGuard } from '../auth/guards/ws.guard';
import { UserEntity } from '../user/user.entity';

type JwtAuthData = {
  user: UserEntity;
};

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class GameGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private gameService: GameService,
    private roomService: RoomService,
  ) {}

  @WebSocketServer()
  io: Server;

  private logger: Logger = new Logger('GameGateway');

  @UseGuards(WsGuard)
  @SubscribeMessage('joinGame')
  async joinGame(
    client: Socket & { user: UserEntity },
    { roomId, user }: { roomId: string } & JwtAuthData,
  ): Promise<void> {
    this.logger.log(`Player joined the room ${roomId}`);
    const gameStatus = await this.gameService.checkGameStatus(roomId);

    const roomPlayers = Array.from(
      this.io.sockets.adapter.rooms.get(roomId) || [],
    );

    const room = await this.roomService.getRoomById(roomId);

    if (room.creator.id !== user.id) {
      room.guestPlayer = user;
      await this.roomService.updateRoom(roomId, room);
    }

    if (gameStatus && roomPlayers.length < 2) {
      client.join(roomId);
    } else {
      client.emit('denyGameJoin');
    }

    if (roomPlayers.length === 1) {
      const { whitePlayer } = await this.gameService.startGame(roomId);
      this.logger.log(`[${roomId}]: game started`);
      this.io.to(roomId).emit('approveGameJoin', { whitePlayer });
    }
  }

  @SubscribeMessage('moveFigure')
  async moveFigure(client: Socket, payload: any): Promise<void> {
    const move = {
      from: payload.from,
      to: payload.to,
      promotion: payload.promotion,
    };
    const { gameId } = payload;
    client.broadcast.to(gameId).emit('moveOpponentFigure', { move });
  }

  @SubscribeMessage('finishGame')
  async finishGame(client: Socket, payload: any) {
    const { gameId, winnerId } = payload;

    await this.gameService.finishGame(gameId, winnerId);

    client.broadcast.to(gameId).emit('finishGame');
    this.io.socketsLeave(gameId);
  }

  @SubscribeMessage('leaveGame')
  async leaveGame(
    client: Socket,
    { roomId, user }: { roomId: string } & JwtAuthData,
  ): Promise<void> {
    await this.roomService.deleteRoom(roomId);

    const room = await this.roomService.getRoomById(roomId);

    if (room?.game) {
      const winnerId =
        room.creator.id === user.id ? room.guestPlayer.id : user.id;
      await this.gameService.finishGame(roomId, winnerId);
    }

    // TODO: If game was created.
    client.broadcast.to(roomId).emit('leaveGame');
    this.io.socketsLeave(roomId);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
