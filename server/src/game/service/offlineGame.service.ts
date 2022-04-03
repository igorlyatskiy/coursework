import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { RoomRepository } from '../../room/room.repository';
import { UserRepository } from '../../user/user.repository';
import { OfflineGameRepository } from '../repository/offlineGame.repository';
import { UserEntity } from '../../user/user.entity';
import { OfflineGameEntity } from '../entity/offlineGame.entity';

@Injectable()
export class OfflineGameService {
  private logger = new Logger('OnlineGameService');
  constructor(
    @InjectRepository(OfflineGameRepository)
    private gameRepository: OfflineGameRepository,
    @InjectRepository(RoomRepository) private roomRepository: RoomRepository,
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  async checkGameStatus(gameId: string) {
    const room = await this.roomRepository.getRoomById(gameId);
    return !!room;
  }

  async startGame(user: UserEntity) {
    const game = new OfflineGameEntity(user);
    await this.gameRepository.saveNewGame(game);
    return game.id;
  }

  async finishGame(gameId: string, winnerColor: 'w' | 'b', isDraw: boolean) {
    winnerColor = isDraw ? null : winnerColor;
    await this.gameRepository.setWinner(gameId, winnerColor, isDraw);
  }
}
