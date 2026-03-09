import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockStocks, StockAsset } from '@/lib/mock/stocks';
import { mockCrypto, CryptoAsset } from '@/lib/mock/crypto';

export type AssetType = 'stock' | 'crypto';
export type Timeframe = '1D' | '1W' | '1M' | '1Y' | 'ALL';

export interface WatchlistItem {
  symbol: string;
  type: AssetType;
}

export interface PortfolioHolding {
  symbol: string;
  type: AssetType;
  quantity: number;
  buyPrice: number;
}

interface MarketStore {
  // Watchlist
  watchlist: WatchlistItem[];
  addToWatchlist: (item: WatchlistItem) => void;
  removeFromWatchlist: (symbol: string) => void;
  isWatchlisted: (symbol: string) => boolean;

  // Portfolio
  portfolio: PortfolioHolding[];
  addHolding: (holding: PortfolioHolding) => void;
  removeHolding: (symbol: string) => void;
  getPortfolioValue: () => number;
  getPortfolioChange: () => number;

  // Compare
  compareAssets: string[];
  addToCompare: (symbol: string) => void;
  removeFromCompare: (symbol: string) => void;
  clearCompare: () => void;

  // UI
  selectedTimeframe: Timeframe;
  setTimeframe: (tf: Timeframe) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;

  // Search
  searchQuery: string;
  setSearchQuery: (q: string) => void;

  // Data access
  getAllAssets: () => (StockAsset | CryptoAsset)[];
  getAssetBySymbol: (symbol: string) => StockAsset | CryptoAsset | undefined;
}

export const useMarketStore = create<MarketStore>()(
  persist(
    (set, get) => ({
      watchlist: [
        { symbol: 'BTC', type: 'crypto' },
        { symbol: 'ETH', type: 'crypto' },
        { symbol: 'AAPL', type: 'stock' },
        { symbol: 'NVDA', type: 'stock' },
      ],
      addToWatchlist: (item) =>
        set((s) => ({
          watchlist: s.watchlist.some((w) => w.symbol === item.symbol)
            ? s.watchlist
            : [...s.watchlist, item],
        })),
      removeFromWatchlist: (symbol) =>
        set((s) => ({ watchlist: s.watchlist.filter((w) => w.symbol !== symbol) })),
      isWatchlisted: (symbol) => get().watchlist.some((w) => w.symbol === symbol),

      portfolio: [
        { symbol: 'BTC', type: 'crypto', quantity: 0.5, buyPrice: 45000 },
        { symbol: 'ETH', type: 'crypto', quantity: 5, buyPrice: 2800 },
        { symbol: 'AAPL', type: 'stock', quantity: 10, buyPrice: 175 },
        { symbol: 'NVDA', type: 'stock', quantity: 3, buyPrice: 650 },
      ],
      addHolding: (holding) =>
        set((s) => ({ portfolio: [...s.portfolio.filter((p) => p.symbol !== holding.symbol), holding] })),
      removeHolding: (symbol) =>
        set((s) => ({ portfolio: s.portfolio.filter((p) => p.symbol !== symbol) })),
      getPortfolioValue: () => {
        const { portfolio, getAllAssets } = get();
        const assets = getAllAssets();
        return portfolio.reduce((total, h) => {
          const asset = assets.find((a) => a.symbol === h.symbol);
          return total + (asset ? asset.price * h.quantity : 0);
        }, 0);
      },
      getPortfolioChange: () => {
        const { portfolio, getAllAssets } = get();
        const assets = getAllAssets();
        let currentValue = 0;
        let costBasis = 0;
        portfolio.forEach((h) => {
          const asset = assets.find((a) => a.symbol === h.symbol);
          if (asset) {
            currentValue += asset.price * h.quantity;
            costBasis += h.buyPrice * h.quantity;
          }
        });
        return ((currentValue - costBasis) / costBasis) * 100;
      },

      compareAssets: ['BTC', 'ETH'],
      addToCompare: (symbol) =>
        set((s) => ({
          compareAssets:
            s.compareAssets.includes(symbol) || s.compareAssets.length >= 3
              ? s.compareAssets
              : [...s.compareAssets, symbol],
        })),
      removeFromCompare: (symbol) =>
        set((s) => ({ compareAssets: s.compareAssets.filter((a) => a !== symbol) })),
      clearCompare: () => set({ compareAssets: [] }),

      selectedTimeframe: '1M',
      setTimeframe: (tf) => set({ selectedTimeframe: tf }),

      sidebarCollapsed: false,
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

      searchQuery: '',
      setSearchQuery: (q) => set({ searchQuery: q }),

      getAllAssets: () => [...mockStocks, ...mockCrypto],
      getAssetBySymbol: (symbol) =>
        [...mockStocks, ...mockCrypto].find((a) => a.symbol.toUpperCase() === symbol.toUpperCase()),
    }),
    {
      name: 'market-store',
      partialize: (s) => ({ watchlist: s.watchlist, portfolio: s.portfolio, compareAssets: s.compareAssets }),
    }
  )
);
