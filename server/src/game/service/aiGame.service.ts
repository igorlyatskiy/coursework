import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { RoomRepository } from '../../room/room.repository';
import { UserRepository } from '../../user/user.repository';
import { UserEntity } from '../../user/user.entity';
import { AiGameRepository } from '../repository/aiGame.repository';
import { AiGameEntity } from '../entity/aiGame.entity';

@Injectable()
export class AiGameService {
  private logger = new Logger('OnlineGameService');
  constructor(
    @InjectRepository(AiGameRepository)
    private gameRepository: AiGameRepository,
    @InjectRepository(RoomRepository) private roomRepository: RoomRepository,
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  async checkGameStatus(gameId: string) {
    const room = await this.roomRepository.getRoomById(gameId);
    return !!room;
  }

  async startGame(user: UserEntity, level: number) {
    const game = new AiGameEntity(user, level);
    await this.gameRepository.saveNewGame(game);
    return game.id;
  }

  async finishGame(gameId: string, winnerColor: 'w' | 'b', isDraw: boolean) {
    await this.gameRepository.setWinner(gameId, winnerColor, isDraw);
  }
}
