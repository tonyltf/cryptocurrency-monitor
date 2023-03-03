import { Controller, Get, Param } from '@nestjs/common';
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

  @Get('/price/:pairs')
  async getPrices(@Param('pairs') pairs: string[]): Promise<any> {
    return this.tickerService.getPrices(pairs);
  }
}
