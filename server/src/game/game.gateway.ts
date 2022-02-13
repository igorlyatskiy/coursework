import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

import { GameService } from './game.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class GameGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private gameService: GameService) {}

  @WebSocketServer()
  io: Server;

  private logger: Logger = new Logger('GameGateway');

  @SubscribeMessage('joinGame')
  async joinGame(client: Socket, gameId: string): Promise<void> {
    this.logger.log('Client joined the game', gameId);
    const gameStatus = await this.gameService.checkGameStatus(gameId);
    this.io.emit(gameStatus ? 'approveGameJoin' : 'denyGameJoin');
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
