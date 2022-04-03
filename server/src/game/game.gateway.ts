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

import { OnlineGameService } from './service/onlineGame.service';
import { RoomService } from '../room/room.service';
import { WsGuard } from '../auth/guards/ws.guard';
import { UserEntity } from '../user/user.entity';
import { GAME_TYPES } from '../Constants';
import { OfflineGameService } from './service/offlineGame.service';
import { AiGameService } from './service/aiGame.service';

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
    private onlineGameService: OnlineGameService,
    private offlineGameService: OfflineGameService,
    private aiGameService: AiGameService,
    private roomService: RoomService,
  ) {}

  @WebSocketServer()
  io: Server;

  private logger: Logger = new Logger('GameGateway');

  @UseGuards(WsGuard)
  @SubscribeMessage(`joinGame__${GAME_TYPES.online}`)
  async joinOnlineGame(
    client: Socket,
    { roomId, user }: { roomId: string } & JwtAuthData,
  ): Promise<void> {
    this.logger.log(`Player joined the room ${roomId}`);
    const gameStatus = await this.onlineGameService.checkGameStatus(roomId);

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
      const { whitePlayer } = await this.onlineGameService.startGame(roomId);
      this.logger.log(`[${roomId}]: game started`);
      this.io.to(roomId).emit('approveGameJoin', { whitePlayer });
    }
  }

  @SubscribeMessage(`moveFigure__${GAME_TYPES.online}`)
  async moveOnlineFigure(client: Socket, payload: any): Promise<void> {
    const move = {
      from: payload.from,
      to: payload.to,
      promotion: payload.promotion,
    };
    const { gameId } = payload;
    client.broadcast.to(gameId).emit('moveOpponentFigure', { move });
  }

  @SubscribeMessage(`moveFigure__${GAME_TYPES.offline}`)
  async moveOfflineFigure(client: Socket, payload: any): Promise<void> {
    //  TODO: Add logic.
  }

  @SubscribeMessage(`moveFigure__${GAME_TYPES.ai}`)
  async moveAiFigure(client: Socket, payload: any): Promise<void> {
    client.emit('moveAiFigure');
    //  TODO: Add logic.
  }

  @SubscribeMessage(`finishGame__${GAME_TYPES.online}`)
  async finishOnlineGame(client: Socket, payload: any) {
    const { gameId, winnerId, isDraw } = payload;

    await this.onlineGameService.finishGame(gameId, winnerId, isDraw);

    client.broadcast.to(gameId).emit(`finishGame__${GAME_TYPES.online}`);
    this.io.socketsLeave(gameId);
  }

  @SubscribeMessage(`finishGame__${GAME_TYPES.offline}`)
  async finishOfflineGame(client: Socket, payload: any) {
    const { gameId, winnerColor, isDraw } = payload;

    await this.offlineGameService.finishGame(gameId, winnerColor, isDraw);
    // TODO: Add finish offline game logic.

    client.broadcast.to(gameId).emit(`finishGame__${GAME_TYPES.offline}`);
    this.io.socketsLeave(gameId);
  }

  @SubscribeMessage(`finishGame__${GAME_TYPES.ai}`)
  async finishAiGame(client: Socket, payload: any) {
    const { gameId, winnerColor, isDraw } = payload;

    await this.aiGameService.finishGame(gameId, winnerColor, isDraw);

    client.broadcast.to(gameId).emit(`finishGame__${GAME_TYPES.ai}`);
    this.io.socketsLeave(gameId);
  }

  @SubscribeMessage(`leaveGame__${GAME_TYPES.online}`)
  async leaveGame(
    client: Socket,
    { roomId, user }: { roomId: string } & JwtAuthData,
  ): Promise<void> {
    await this.roomService.deleteRoom(roomId);

    const room = await this.roomService.getRoomById(roomId);

    if (room?.game) {
      const winnerId =
        room.creator.id === user.id ? room.guestPlayer.id : user.id;
      await this.onlineGameService.finishGame(roomId, winnerId, false);
    }

    client.broadcast.to(roomId).emit('leaveGame');
    this.io.socketsLeave(roomId);
  }

  @UseGuards(WsGuard)
  @SubscribeMessage(`joinGame__${GAME_TYPES.offline}`)
  async joinPvpOfflineGame(
    client: Socket,
    { user }: JwtAuthData,
  ): Promise<void> {
    const gameId = await this.offlineGameService.startGame(user);
    client.emit(`joinGame__${GAME_TYPES.offline}`, { gameId });
  }

  @UseGuards(WsGuard)
  @SubscribeMessage(`joinGame__${GAME_TYPES.ai}`)
  async joiAiOfflineGame(
    client: Socket,
    { user, aiLevel }: JwtAuthData & { aiLevel: number },
  ): Promise<void> {
    const gameId = await this.aiGameService.startGame(user, aiLevel);
    client.emit(`joinGame__${GAME_TYPES.ai}`, { gameId });
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
