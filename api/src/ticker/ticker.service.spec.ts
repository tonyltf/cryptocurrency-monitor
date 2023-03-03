import { Test, TestingModule } from '@nestjs/testing';
import { TickerService } from './ticker.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '../lib/cache/cache.module';
import { LoggerModule } from '../lib/logger/logger.module';

describe('TickerService', () => {
  let service: TickerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), HttpModule, CacheModule, LoggerModule],
      providers: [TickerService],
    }).compile();

    service = module.get<TickerService>(TickerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call an API', async () => {
    const response = await service.fetchPrices(['BTCUSDT']);
    expect(response).toHaveLength(1);
    const { symbol, lastPrice } = response?.[0] || {};
    expect(symbol).toEqual('BTCUSDT');
    expect(parseFloat(lastPrice)).toBeGreaterThan(0);
  });

  it('should trasform the response', async () => {
    const response = await service.transform([
      {
        symbol: 'BTCUSDT',
        priceChange: '-1078.45000000',
        priceChangePercent: '-4.599',
        weightedAvgPrice: '22998.69555632',
        openPrice: '23451.66000000',
        highPrice: '23567.52000000',
        lowPrice: '21971.13000000',
        lastPrice: '22373.21000000',
        volume: '315422.50761000',
        quoteVolume: '7254306224.13293370',
        openTime: 1677739260000,
        closeTime: 1677825676436,
        firstId: 2852724596,
        lastId: 2861289434,
        count: 8564839,
      },
    ]);
    expect(response).toHaveLength(1);
    const { symbol, price } = response?.[0] || {};
    expect(symbol).toEqual('BTCUSDT');
    expect(price).toEqual(22373.21);
  });

  it('should cache the price', async () => {
    const pair = 'BTCUSDT';
    const data = {
      symbol: 'BTCUSDT',
      priceChange: '-1078.45000000',
      priceChangePercent: '-4.599',
      weightedAvgPrice: '22998.69555632',
      openPrice: '23451.66000000',
      highPrice: '23567.52000000',
      lowPrice: '21971.13000000',
      lastPrice: '22373.21000000',
      volume: '315422.50761000',
      quoteVolume: '7254306224.13293370',
      openTime: 1677739260000,
      closeTime: 1677825676436,
      firstId: 2852724596,
      lastId: 2861289434,
      count: 8564839,
    };
    await service.cachePrice(pair, data);
    const cachedData = await service.getCachedPrice(pair);
    expect(JSON.stringify(data)).toEqual(JSON.stringify(cachedData));
  });
});
