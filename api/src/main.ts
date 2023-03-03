import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { LoggerService } from './lib/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Cryptocurrency monitor API')
    .setDescription('The API document')
    .setVersion('1.0')
    .addTag('crypto')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useLogger(new LoggerService());
  app.use(helmet());
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
  });
  await app.listen(8000);
}
bootstrap();
