import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

export default class TypeormConfig {
  static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      username: configService.get('db.username'),
      password: configService.get('db.password'),
      database: configService.get('db.database'),
      host: configService.get('db.host'),
      port: configService.get('db.port'),
      type: 'postgres',
      ssl: true,
      synchronize: configService.get('db.sync'),
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    };
  }
}

export const typeOrmConfigAsync = {
  imports: [ConfigModule],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => TypeormConfig.getOrmConfig(configService),
  inject: [ConfigService],
};
