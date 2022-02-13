import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

async function bootstrap() {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  // TODO REMOVE IT

  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());

  const logger = new Logger('main');

  const PORT = configService.get('app.port');
  await app.listen(PORT, () =>
    logger.log(`SERVER IS RUNNING ON PORT [ ${PORT} ]`),
  );
}

bootstrap();
