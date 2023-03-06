import { HttpService } from '@nestjs/axios';
import { Injectable, CACHE_MANAGER, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';

import {
  ITickerReponse,
  ITickerResult,
  ICurrencyList,
} from './ticker.inteface';
import { LoggerService } from '../lib/logger/logger.service';

@Injectable()
export class TickerService {
  private apiPath: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
    private readonly logger: LoggerService
  ) {
    this.apiPath = configService.get('API_PATH');
  }

  getCurrencyList(): ICurrencyList {
    return {
      Bitcoin: 'BTCUSDT',
      Ether: 'ETHUSDT',
      Litecoin: 'LTCUSDT',
      Monero: 'XMRUSDT',
      Ripple: 'XRPUSDT',
      Dogecoin: 'DOGEUSDT',
      Dash: 'DASHUSDT',
    };
  }

  async cachePrice(
    pair,
    data: ITickerReponse,
    ttl = this.configService.get('TICKER_SOURCE_TTL')
  ) {
    try {
      return this.cacheService.set(pair, JSON.stringify(data), ttl);
    } catch (e) {
      console.error(e);
    }
  }

  transform(input: ITickerReponse[]): ITickerResult[] {
    return input.map(({ symbol, lastPrice, volume, priceChange }) => {
      return {
        symbol,
        price: parseFloat(lastPrice),
        volume: parseFloat(volume),
        change: parseFloat(priceChange),
      };
    });
  }

  async getCachedPrice(pair: string): Promise<ITickerReponse | null> {
    try {
      const cached = await this.cacheService.get<string>(pair);
      if (!cached) {
        this.logger.log(`Cache for ${pair} missed`);
        return null;
      }
      this.logger.log(`Cache ${pair} found`);
      return JSON.parse(cached);
    } catch (e) {
      this.logger.error(e);
    }
  }

  async fetchPrices(pairs: string[]): Promise<ITickerReponse[]> {
    try {
      const apiPath = `${this.apiPath}?symbols=[${pairs
        .map((pair) => `"${pair}"`)
        .join(',')}]`;
      const response = (
        await this.httpService.axiosRef.get<ITickerReponse[]>(apiPath)
      ).data;
      return response;
    } catch (e) {
      this.logger.error(e);
    }
  }

  async getPrices(pairs: string[]): Promise<ITickerResult[]> {
    try {
      const cachedResponse: ITickerReponse[] = (
        await Promise.all(pairs.map((pair) => this.getCachedPrice(pair)))
      ).filter((cached) => !!cached);

      const pairsToFetch = pairs.filter(
        (pair) =>
          !(cachedResponse?.map(({ symbol }) => symbol) || []).includes(pair)
      );

      const fetchResponse = pairsToFetch?.length
        ? await this.fetchPrices(pairsToFetch)
        : [];
      await Promise.all(fetchResponse.map(data => this.cachePrice(data.symbol, data)));
      return this.transform([...cachedResponse, ...fetchResponse]);
    } catch (e) {
      this.logger.error(e);
    }
  }
}
