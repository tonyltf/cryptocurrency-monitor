import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TickerService } from './ticker/ticker.service';
import { CacheModule } from './lib/cache/cache.module';
import { LoggerModule } from './lib/logger/logger.module';

describe('AppController', () => {
  let appController: AppController;
  let bitcoinPair: string;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), HttpModule, CacheModule, LoggerModule],
      controllers: [AppController],
      providers: [AppService, TickerService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });

    it('should return the list of available currency', () => {
      const list = appController.getCurrencyList();
      bitcoinPair = list?.Bitcoin;
      expect(list).toBeDefined();
      expect(bitcoinPair).toBeDefined();
      expect(bitcoinPair).toEqual('BTCUSDT');
    });

    it('should return price info of Bitcoin', async () => {
      console.log({ bitcoinPair });
      const btc = await appController.getPrices([bitcoinPair]);
      console.log({ btc });
      expect(btc).toHaveLength(1);
      expect(btc?.[0].price).toBeDefined();
    });
  });
});
