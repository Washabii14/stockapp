import useSWR from 'swr';
import { mockStocks, StockAsset, getStockBySymbol } from '@/lib/mock/stocks';
import { mockCrypto, CryptoAsset, getCryptoBySymbol } from '@/lib/mock/crypto';

// Simulate async API delay
async function mockFetcher<T>(data: T, delay = 300): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), delay));
}

// Structured for real API: fetcher would be:
// async (url: string) => fetch(`https://api.coingecko.com/api/v3${url}`).then(r => r.json())
// or for stocks: fetch(`https://finnhub.io/api/v1${url}?token=${API_KEY}`)

export function useStocks() {
  const { data, error, isLoading } = useSWR<StockAsset[]>(
    '/api/stocks',
    () => mockFetcher(mockStocks),
    { refreshInterval: 30000 }
  );
  return { stocks: data ?? [], error, isLoading };
}

export function useCrypto() {
  const { data, error, isLoading } = useSWR<CryptoAsset[]>(
    '/api/crypto',
    () => mockFetcher(mockCrypto),
    { refreshInterval: 15000 }
  );
  return { crypto: data ?? [], error, isLoading };
}

export function useStock(symbol: string) {
  const { data, error, isLoading } = useSWR<StockAsset | undefined>(
    symbol ? `/api/stocks/${symbol}` : null,
    () => mockFetcher(getStockBySymbol(symbol))
  );
  return { stock: data, error, isLoading };
}

export function useCryptoAsset(symbol: string) {
  const { data, error, isLoading } = useSWR<CryptoAsset | undefined>(
    symbol ? `/api/crypto/${symbol}` : null,
    () => mockFetcher(getCryptoBySymbol(symbol))
  );
  return { crypto: data, error, isLoading };
}

export function useAllAssets() {
  const { stocks, isLoading: stocksLoading } = useStocks();
  const { crypto, isLoading: cryptoLoading } = useCrypto();
  
  return {
    assets: [...stocks, ...crypto],
    isLoading: stocksLoading || cryptoLoading,
  };
}

export type { StockAsset, CryptoAsset };
