import { Module, CacheModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import type { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-redis-yet';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { TickerService } from '../ticker/ticker.service';
import { LoggerModule } from '../lib/logger/logger.module';

export const CacheProvider = CacheModule.registerAsync<RedisClientOptions>({
    imports: [ConfigModule.forRoot()],
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => {
      console.log(config.get('REDIS_URL'));
      return {
      store: await redisStore({
        url: config.get('REDIS_URL')
      }),
    }}
  });
@Module({
  imports: [ConfigModule.forRoot(), HttpModule, CacheProvider, LoggerModule],
  controllers: [AppController],
  providers: [AppService, TickerService],
})
export class AppModule {}
