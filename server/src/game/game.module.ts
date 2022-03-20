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

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OnlineGameRepository,
      OfflineGameRepository,
      RoomRepository,
      UserRepository,
    ]),
    RoomModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [OnlineGameService, OfflineGameService, GameGateway],
})
export class GameModule {}
