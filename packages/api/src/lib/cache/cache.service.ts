import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CacheService {
  constructor(@InjectRedis() private readonly cache: Redis) {}

  async get<T>(name: string, json = false): Promise<T> {
    const result = await this.cache.get(name);

    return json ? JSON.parse(result) : result;
  }

  async set(name: string, data: string | number | Buffer, time: number) {
    const result = await this.cache.set(name, data, 'EX', time);

    return result;
  }

  async del(name: string) {
    const result = await this.cache.del(name);

    return result;
  }
}
