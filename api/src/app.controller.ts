import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { TickerService } from './ticker/ticker.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly tickerService: TickerService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/list')
  getCurrencyList(): { [key: string]: string } {
    return this.tickerService.getCurrencyList();
  }

  @Get('/price')
  async getPrices(@Query('pairs') pairs: string | string[]): Promise<any> {
    if (typeof pairs === 'string') {
      return this.tickerService.getPrices([pairs]);
    } else {
      return this.tickerService.getPrices(pairs);
    }
  }
}
