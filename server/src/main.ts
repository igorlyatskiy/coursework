import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  const logger = new Logger('main');

  const PORT = configService.get('app.port');
  await app.listen(PORT, () =>
    logger.log(`SERVER IS RUNNING ON PORT [ ${PORT} ]`),
  );
}

bootstrap();
