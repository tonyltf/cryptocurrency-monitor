import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { TickerService } from './ticker/ticker.service';
import { CacheModule } from './lib/cache/cache.module';
import { LoggerModule } from './lib/logger/logger.module';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule, CacheModule, LoggerModule],
  controllers: [AppController],
  providers: [AppService, TickerService],
})
export class AppModule {}
