import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '../lib/cache/cache.module';
import { LoggerModule } from '../lib/logger/logger.module';
import { TickerService } from './ticker.service';
import { AppController } from '../app/app.controller';
import { AppService } from '../app/app.service';

describe('Ticker', () => {
  let app: INestApplication;
  const tickerService = {
    getCurrencyList: () => ({
      Bitcoin: 'BTCUSDT',
      Ether: 'ETHUSDT',
      Litecoin: 'LTCUSDT',
      Monero: 'XMRUSDT',
      Ripple: 'XRPUSDT',
      Dogecoin: 'DOGEUSDT',
      Dash: 'DASHUSDT',
    }),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), HttpModule, CacheModule, LoggerModule],
      controllers: [AppController],
      providers: [AppService, TickerService],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET list`, () => {
    return request(app.getHttpServer())
      .get('/list')
      .expect(200)
      .expect(tickerService.getCurrencyList());
  });

  it(`/GET price for BTC`, () => {
    return request(app.getHttpServer()).get('/price?pairs=BTCUSDT').expect(200);
  });

  it(`/GET price for BTC and ETH`, () => {
    return request(app.getHttpServer())
      .get('/price?pairs=BTCUSDT&pairs=ETHUSDT')
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
