import axios from 'axios';

export async function getPrice(pair: string): Promise<TickerResponse[]> {
  // Instead of the file system,
  // fetch post data from an external API endpoint
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_EXTERNAL_API_PATH}/price?pairs=${pair}`
  );
  return res.data;
}

export interface TickerResponse {
  symbol?: string;
  price?: number;
  volume?: number;
  change?: number;
}

export interface CurrencyInfo {
  name: string;
  pair: string;
}

export type TPriceCard = TickerResponse & CurrencyInfo;
