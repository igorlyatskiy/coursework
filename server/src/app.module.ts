import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { RoomModule } from './room/room.module';

import { typeOrmConfigAsync } from './config/typeorm.config';
import configuration from './config/index';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    RoomModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
