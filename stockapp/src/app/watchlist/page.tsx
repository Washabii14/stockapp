'use client';

import Link from 'next/link';
import { LineChart, Trash2, Search } from 'lucide-react';
import { useMarketStore } from '@/store/useMarketStore';
import { useWatchlistActions } from '@/hooks/useWatchlistActions';
import { useAllAssets } from '@/hooks/useAssetData';
import type { StockAsset } from '@/lib/mock/stocks';
import type { CryptoAsset } from '@/lib/mock/crypto';

type Asset = StockAsset | CryptoAsset;

function formatPrice(price: number): string {
  return price >= 1
    ? price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : price.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 });
}

function PctChange({ value }: { value: number }) {
  const isPositive = value >= 0;
  return (
    <span className={isPositive ? 'text-[#39ff14]' : 'text-[#ff4757]'}>
      {isPositive ? '+' : ''}{value.toFixed(2)}%
    </span>
  );
}

function WatchlistSkeleton() {
  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="p-4 border-b border-[#1e2030]">
        <div className="h-5 w-32 skeleton rounded" />
      </div>
      <div className="divide-y divide-[#1e2030]">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 skeleton rounded-lg" />
              <div className="space-y-1">
                <div className="h-4 w-16 skeleton rounded" />
                <div className="h-3 w-24 skeleton rounded" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-4 w-20 skeleton rounded" />
              <div className="h-8 w-8 skeleton rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WatchlistEmpty() {
  return (
    <div className="glass-card rounded-xl p-8 md:p-12 text-center border border-dashed border-[#1e2030]">
      <div className="w-16 h-16 rounded-full bg-[#1a1d2e] flex items-center justify-center mx-auto mb-4">
        <LineChart size={32} className="text-[#475569]" />
      </div>
      <h2 className="text-lg font-semibold text-[#e2e8f0] mb-2">No assets in watchlist</h2>
      <p className="text-sm text-[#94a3b8] mb-6 max-w-sm mx-auto">
        Search for stocks and crypto to add to your watchlist. Use the search bar (⌘K) or browse markets.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#1a1d2e] text-[#00f5ff] text-sm font-medium hover:bg-[#252840] transition-colors"
        >
          <Search size={16} /> Go to Dashboard
        </Link>
        <Link
          href="/markets"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[#1e2030] text-[#94a3b8] text-sm font-medium hover:bg-[#1a1d2e] hover:text-[#e2e8f0] transition-colors"
        >
          Browse Markets
        </Link>
      </div>
    </div>
  );
}

export default function WatchlistPage() {
  const { isLoading } = useAllAssets();
  const watchlist = useMarketStore((s) => s.watchlist);
  const { removeFromWatchlistSync } = useWatchlistActions();
  const getAssetBySymbol = useMarketStore((s) => s.getAssetBySymbol);

  const watchlistWithAssets = watchlist
    .map((item) => {
      const asset = getAssetBySymbol(item.symbol);
      return asset ? { ...item, asset } : null;
    })
    .filter((item): item is { symbol: string; type: 'stock' | 'crypto'; asset: Asset } => item !== null);

  if (isLoading) {
    return (
      <div className="p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-xl md:text-2xl font-bold text-[#e2e8f0] mb-6">Watchlist</h1>
          <WatchlistSkeleton />
        </div>
      </div>
    );
  }

  if (watchlist.length === 0) {
    return (
      <div className="p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-xl md:text-2xl font-bold text-[#e2e8f0] mb-6">Watchlist</h1>
          <WatchlistEmpty />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-xl md:text-2xl font-bold text-[#e2e8f0] mb-6">Watchlist</h1>

        <div className="glass-card rounded-xl overflow-hidden">
          {/* Table header - hidden on mobile, shown on md+ */}
          <div className="hidden md:grid md:grid-cols-12 gap-4 px-4 py-3 border-b border-[#1e2030] text-xs font-medium text-[#475569] uppercase tracking-wider">
            <div className="md:col-span-5">Asset</div>
            <div className="md:col-span-2">Type</div>
            <div className="md:col-span-2 text-right">Price</div>
            <div className="md:col-span-2 text-right">24h</div>
            <div className="md:col-span-1" />
          </div>

          <div className="divide-y divide-[#1e2030]">
            {watchlistWithAssets.map(({ symbol, type, asset }) => (
              <div
                key={symbol}
                className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 px-4 py-4 md:py-3 items-center hover:bg-[#0f1117]/50 transition-colors group"
              >
                <div className="md:col-span-5 flex items-center gap-3">
                  <Link
                    href={`/assets/${symbol}`}
                    className="flex items-center gap-3 min-w-0 flex-1"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#1a1d2e] flex items-center justify-center text-sm font-bold text-[#00f5ff] border border-[#1e2030] flex-shrink-0">
                      {symbol.slice(0, 2)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#e2e8f0] group-hover:text-[#00f5ff] transition-colors truncate">
                        {symbol}
                      </p>
                      <p className="text-xs text-[#475569] truncate">{asset.name}</p>
                    </div>
                  </Link>
                </div>
                <div className="md:col-span-2">
                  <span className="inline-flex px-2 py-0.5 rounded text-xs font-medium bg-[#1a1d2e] text-[#94a3b8] border border-[#1e2030]">
                    {type}
                  </span>
                </div>
                <div className="md:col-span-2 text-right">
                  <p className="text-sm font-mono text-[#e2e8f0] tabular-nums">
                    ${formatPrice(asset.price)}
                  </p>
                </div>
                <div className="md:col-span-2 text-right">
                  <PctChange value={asset.changePercent24h} />
                </div>
                <div className="md:col-span-1 flex justify-end md:justify-start">
                  <button
                    onClick={() => removeFromWatchlistSync(symbol)}
                    className="p-2 rounded-lg text-[#475569] hover:text-[#ff4757] hover:bg-[#1a1d2e] transition-colors"
                    title="Remove from watchlist"
                    aria-label={`Remove ${symbol} from watchlist`}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
