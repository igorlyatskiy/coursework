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

  @SubscribeMessage('joinGame')
  async joinGame(client: Socket, gameId: string): Promise<void> {
    this.logger.log(`Player joined the room ${gameId}`);
    const gameStatus = await this.gameService.checkGameStatus(gameId);

    const roomPlayers = Array.from(
      this.io.sockets.adapter.rooms.get(gameId) || [],
    );

    if (gameStatus && roomPlayers.length < 2) {
      client.join(gameId);
    } else {
      client.emit('denyGameJoin');
    }

    if (roomPlayers.length === 1) {
      const { whitePlayer } = await this.gameService.startGame(gameId);
      this.logger.log(`[${gameId}]: game started`);
      this.io.to(gameId).emit('approveGameJoin', { whitePlayer });
    }
  }

  @SubscribeMessage('moveFigure')
  async moveFigure(client: Socket, payload: any): Promise<void> {
    const move = {
      from: payload.from,
      to: payload.to,
      promotion: payload.promotion,
    };
    const { gameId, isGameFinished } = payload;
    client.broadcast
      .to(gameId)
      .emit('moveOpponentFigure', { move, isGameFinished });
  }

  @SubscribeMessage('leaveGame')
  async leaveGame(client: Socket, gameId: string): Promise<void> {
    await this.roomService.deleteRoom(gameId);

    // TODO: If game was created.
    client.broadcast.to(gameId).emit('leaveGame');

    this.io.socketsLeave(gameId);
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
