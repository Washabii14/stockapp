import { generateOHLCV } from './generateOHLCV';

export interface StockAsset {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  changePercent24h: number;
  marketCap: number;
  volume24h: number;
  peRatio: number | null;
  ath: number;
  athDate: string;
  sector: string;
  logoUrl?: string;
  ohlcv: {
    '1D': OHLCVDataPoint[];
    '1W': OHLCVDataPoint[];
    '1M': OHLCVDataPoint[];
    '1Y': OHLCVDataPoint[];
    'ALL': OHLCVDataPoint[];
  };
}

export interface OHLCVDataPoint {
  timestamp: number;
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

const stocksBase = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 189.5, sector: 'Technology', peRatio: 31.2, ath: 199.62, athDate: '2023-12-14', seed: 1 },
  { symbol: 'TSLA', name: 'Tesla, Inc.', price: 241.8, sector: 'Automotive', peRatio: 68.4, ath: 414.5, athDate: '2021-11-04', seed: 2 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 415.3, sector: 'Technology', peRatio: 36.8, ath: 430.82, athDate: '2024-07-05', seed: 3 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 172.6, sector: 'Technology', peRatio: 27.3, ath: 191.75, athDate: '2024-02-05', seed: 4 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 198.2, sector: 'E-Commerce', peRatio: 62.1, ath: 201.2, athDate: '2024-03-20', seed: 5 },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 875.4, sector: 'Technology', peRatio: 65.2, ath: 974.0, athDate: '2024-06-18', seed: 6 },
  { symbol: 'META', name: 'Meta Platforms', price: 527.9, sector: 'Technology', peRatio: 29.7, ath: 531.49, athDate: '2024-07-25', seed: 7 },
  { symbol: 'NFLX', name: 'Netflix Inc.', price: 685.3, sector: 'Entertainment', peRatio: 48.1, ath: 700.99, athDate: '2024-07-17', seed: 8 },
  { symbol: 'AMD', name: 'Advanced Micro Devices', price: 162.7, sector: 'Technology', peRatio: 302.5, ath: 227.3, athDate: '2024-03-07', seed: 9 },
  { symbol: 'JPM', name: 'JPMorgan Chase', price: 214.5, sector: 'Finance', peRatio: 12.4, ath: 223.1, athDate: '2024-01-19', seed: 10 },
];

const changes = [
  { change24h: 2.87, pct: 1.54 },
  { change24h: -8.32, pct: -3.32 },
  { change24h: 5.1, pct: 1.24 },
  { change24h: -1.9, pct: -1.09 },
  { change24h: 3.25, pct: 1.67 },
  { change24h: 21.3, pct: 2.5 },
  { change24h: 12.7, pct: 2.46 },
  { change24h: -10.2, pct: -1.46 },
  { change24h: 4.3, pct: 2.71 },
  { change24h: 1.8, pct: 0.84 },
];

const marketCaps = [
  2.94e12, 7.65e11, 3.09e12, 2.16e12, 1.04e12, 2.15e12, 1.35e12, 2.96e11, 2.62e11, 6.14e11,
];

const volumes = [
  5.82e10, 1.23e11, 2.14e10, 1.68e10, 4.31e10, 4.51e10, 1.72e10, 6.21e9, 4.73e10, 1.12e10,
];

export const mockStocks: StockAsset[] = stocksBase.map((s, i) => ({
  id: s.symbol.toLowerCase(),
  symbol: s.symbol,
  name: s.name,
  price: s.price,
  change24h: changes[i].change24h,
  changePercent24h: changes[i].pct,
  marketCap: marketCaps[i],
  volume24h: volumes[i],
  peRatio: s.peRatio,
  ath: s.ath,
  athDate: s.athDate,
  sector: s.sector,
  ohlcv: {
    '1D': generateOHLCV(s.price, 390, 'minute', s.seed),
    '1W': generateOHLCV(s.price, 7, 'day', s.seed),
    '1M': generateOHLCV(s.price, 30, 'day', s.seed),
    '1Y': generateOHLCV(s.price, 252, 'day', s.seed),
    'ALL': generateOHLCV(s.price, 1260, 'day', s.seed),
  },
}));

export function getStockBySymbol(symbol: string): StockAsset | undefined {
  return mockStocks.find(s => s.symbol.toUpperCase() === symbol.toUpperCase());
}
