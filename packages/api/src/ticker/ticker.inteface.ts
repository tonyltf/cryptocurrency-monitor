export interface ITickerReponse {
  symbol: string;
  priceChange: string;
  priceChangePercent: string;
  weightedAvgPrice: string;
  openPrice: string;
  highPrice: string;
  lowPrice: string;
  lastPrice: string;
  volume: string;
  quoteVolume: string;
  openTime: number;
  closeTime: number;
  firstId: number;
  lastId: number;
  count: number;
}
export interface ITickerResult {
  symbol: string;
  price: number;
  volume: number;
  change: number;
}

export interface ICurrencyList {
  [code: string]: string;
}
