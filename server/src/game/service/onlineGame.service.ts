import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { OnlineGameRepository } from '../repository/onlineGame.repository';
import { RoomRepository } from '../../room/room.repository';
import { UserRepository } from '../../user/user.repository';
import { OnlineGameEntity } from '../entity/onlineGame.entity';

@Injectable()
export class OnlineGameService {
  private logger = new Logger('OnlineGameService');
  constructor(
    @InjectRepository(OnlineGameRepository)
    private gameRepository: OnlineGameRepository,
    @InjectRepository(RoomRepository) private roomRepository: RoomRepository,
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  async checkGameStatus(gameId: string) {
    const room = await this.roomRepository.getRoomById(gameId);
    return !!room;
  }

  async startGame(gameId: string) {
    const room = await this.roomRepository.getRoomById(gameId);

    const game = new OnlineGameEntity(room.id);
    game.whitePlayer = room.creator;
    // TODO: For now creator always plays as white player.

    room.game = game;

    await this.gameRepository.saveNewGame(game);
    await this.roomRepository.updateRoom(gameId, room);

    return { whitePlayer: game.whitePlayer.id };
  }

  async finishGame(gameId: string, winnerId: string, isDraw: boolean) {
    const winner = isDraw ? null : await this.userRepository.getById(winnerId);
    await this.gameRepository.setWinner(gameId, winner, isDraw);
  }
}
