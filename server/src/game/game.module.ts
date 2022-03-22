import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OnlineGameService } from './service/onlineGame.service';
import { GameGateway } from './game.gateway';
import { OnlineGameRepository } from './repository/onlineGame.repository';
import { RoomModule } from '../room/room.module';
import { RoomRepository } from '../room/room.repository';
import { UserRepository } from '../user/user.repository';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { OfflineGameService } from './service/offlineGame.service';
import { OfflineGameRepository } from './repository/offlineGame.repository';
import { AiGameService } from './service/aiGame.service';
import { AiGameRepository } from './repository/aiGame.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OnlineGameRepository,
      OfflineGameRepository,
      AiGameRepository,
      RoomRepository,
      UserRepository,
    ]),
    RoomModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    OnlineGameService,
    OfflineGameService,
    AiGameService,
    GameGateway,
  ],
})
export class GameModule {}
