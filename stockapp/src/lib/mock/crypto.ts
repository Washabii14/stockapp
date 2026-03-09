import { generateOHLCV } from './generateOHLCV';
import { OHLCVDataPoint } from './stocks';

export interface CryptoAsset {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  changePercent24h: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  ath: number;
  athDate: string;
  category: string;
  ohlcv: {
    '1D': OHLCVDataPoint[];
    '1W': OHLCVDataPoint[];
    '1M': OHLCVDataPoint[];
    '1Y': OHLCVDataPoint[];
    'ALL': OHLCVDataPoint[];
  };
}

const cryptosBase = [
  { symbol: 'BTC', name: 'Bitcoin', price: 67842, category: 'Layer 1', ath: 73750, athDate: '2024-03-14', supply: 19.7e6, seed: 101 },
  { symbol: 'ETH', name: 'Ethereum', price: 3521, category: 'Layer 1', ath: 4878, athDate: '2021-11-10', supply: 120.3e6, seed: 102 },
  { symbol: 'SOL', name: 'Solana', price: 178.4, category: 'Layer 1', ath: 259.96, athDate: '2021-11-06', supply: 448e6, seed: 103 },
  { symbol: 'BNB', name: 'BNB', price: 598.2, category: 'Exchange', ath: 686.31, athDate: '2021-05-10', supply: 140.8e6, seed: 104 },
  { symbol: 'XRP', name: 'XRP', price: 0.627, category: 'Payments', ath: 3.84, athDate: '2018-01-04', supply: 54.9e9, seed: 105 },
  { symbol: 'ADA', name: 'Cardano', price: 0.448, category: 'Layer 1', ath: 3.1, athDate: '2021-09-02', supply: 35.2e9, seed: 106 },
  { symbol: 'AVAX', name: 'Avalanche', price: 35.8, category: 'Layer 1', ath: 144.96, athDate: '2021-11-21', supply: 405e6, seed: 107 },
  { symbol: 'DOGE', name: 'Dogecoin', price: 0.162, category: 'Meme', ath: 0.7376, athDate: '2021-05-08', supply: 142.5e9, seed: 108 },
  { symbol: 'DOT', name: 'Polkadot', price: 7.23, category: 'Layer 0', ath: 55.0, athDate: '2021-11-04', supply: 1.42e9, seed: 109 },
  { symbol: 'LINK', name: 'Chainlink', price: 14.8, category: 'Oracle', ath: 52.7, athDate: '2021-05-10', supply: 608e6, seed: 110 },
];

const cryptoChanges = [
  { change24h: 1124.5, pct: 1.68 },
  { change24h: -87.2, pct: -2.41 },
  { change24h: 8.7, pct: 5.13 },
  { change24h: -12.4, pct: -2.03 },
  { change24h: 0.018, pct: 2.96 },
  { change24h: -0.011, pct: -2.40 },
  { change24h: 1.9, pct: 5.61 },
  { change24h: 0.008, pct: 5.19 },
  { change24h: -0.32, pct: -4.24 },
  { change24h: 0.42, pct: 2.92 },
];

const cryptoMarketCaps = [
  1.34e12, 4.23e11, 7.98e10, 8.72e10, 3.44e10, 1.58e10, 1.46e10, 2.31e10, 1.03e10, 8.99e9,
];

const cryptoVolumes = [
  3.82e10, 1.54e10, 4.21e9, 1.89e9, 2.16e9, 4.82e8, 5.12e8, 1.83e9, 2.54e8, 4.97e8,
];

export const mockCrypto: CryptoAsset[] = cryptosBase.map((c, i) => ({
  id: c.symbol.toLowerCase(),
  symbol: c.symbol,
  name: c.name,
  price: c.price,
  change24h: cryptoChanges[i].change24h,
  changePercent24h: cryptoChanges[i].pct,
  marketCap: cryptoMarketCaps[i],
  volume24h: cryptoVolumes[i],
  circulatingSupply: c.supply,
  ath: c.ath,
  athDate: c.athDate,
  category: c.category,
  ohlcv: {
    '1D': generateOHLCV(c.price, 390, 'minute', c.seed),
    '1W': generateOHLCV(c.price, 7, 'day', c.seed),
    '1M': generateOHLCV(c.price, 30, 'day', c.seed),
    '1Y': generateOHLCV(c.price, 252, 'day', c.seed),
    'ALL': generateOHLCV(c.price, 1260, 'day', c.seed),
  },
}));

export function getCryptoBySymbol(symbol: string): CryptoAsset | undefined {
  return mockCrypto.find(c => c.symbol.toUpperCase() === symbol.toUpperCase());
}
