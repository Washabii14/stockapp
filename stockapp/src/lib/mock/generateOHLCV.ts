import { OHLCVDataPoint } from './stocks';
import { format, subMinutes, subDays } from 'date-fns';

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function generateOHLCV(
  currentPrice: number,
  count: number,
  interval: 'minute' | 'day',
  seed: number
): OHLCVDataPoint[] {
  const rand = seededRandom(seed * count);
  const data: OHLCVDataPoint[] = [];
  
  // Walk backward to generate historical data
  const startPrice = currentPrice * (0.65 + rand() * 0.4);
  let price = startPrice;
  const volatility = interval === 'minute' ? 0.002 : 0.025;
  
  for (let i = count; i >= 0; i--) {
    const timestamp =
      interval === 'minute'
        ? subMinutes(new Date(), i).getTime()
        : subDays(new Date(), i).getTime();
    
    const dateStr =
      interval === 'minute'
        ? format(new Date(timestamp), 'HH:mm')
        : format(new Date(timestamp), 'MMM dd, yyyy');
    
    const change = (rand() - 0.48) * volatility * price;
    const open = price;
    price = Math.max(price + change, price * 0.5);
    const close = price;
    const high = Math.max(open, close) * (1 + rand() * volatility * 0.5);
    const low = Math.min(open, close) * (1 - rand() * volatility * 0.5);
    const volume = Math.floor((1e6 + rand() * 9e6) * (currentPrice > 100 ? currentPrice / 100 : 1));
    
    data.push({ timestamp, date: dateStr, open, high, low, close, volume });
  }
  
  // Ensure the last point converges to current price
  if (data.length > 0) {
    data[data.length - 1].close = currentPrice;
    data[data.length - 1].high = Math.max(data[data.length - 1].high, currentPrice);
    data[data.length - 1].low = Math.min(data[data.length - 1].low, currentPrice);
  }
  
  return data;
}
