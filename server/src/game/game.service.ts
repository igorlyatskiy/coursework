import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameRepository } from './game.repository';
import { GameEntity } from './game.entity';
import { RoomRepository } from '../room/room.repository';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class GameService {
  private logger = new Logger('GameService');
  constructor(
    @InjectRepository(GameRepository) private gameRepository: GameRepository,
    @InjectRepository(RoomRepository) private roomRepository: RoomRepository,
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  async checkGameStatus(gameId: string) {
    const room = await this.roomRepository.getRoomById(gameId);
    return !!room;
  }

  async startGame(gameId: string) {
    const room = await this.roomRepository.getRoomById(gameId);

    const game = new GameEntity(room.id);
    game.whitePlayer = room.creator;
    game.type = 'pvp-online';
    // TODO: For now creator always plays as white player.

    room.game = game;

    await this.gameRepository.saveNewGame(game);
    await this.roomRepository.updateRoom(gameId, room);

    return { whitePlayer: game.whitePlayer.id };
  }

  async finishGame(gameId: string, winnerId: string) {
    const winner = await this.userRepository.getById(winnerId);
    await this.gameRepository.setWinner(gameId, winner);
  }
}
