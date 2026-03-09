'use client';

import Link from 'next/link';
import { TrendingUp, Wallet, LineChart } from 'lucide-react';
import { useMarketStore } from '@/store/useMarketStore';
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

function PortfolioOverviewSkeleton() {
  return (
    <div className="glass-card rounded-xl p-6 animate-pulse">
      <div className="h-4 w-24 skeleton rounded mb-4" />
      <div className="h-10 w-40 skeleton rounded mb-2" />
      <div className="h-4 w-28 skeleton rounded" />
    </div>
  );
}

function PortfolioOverviewCard({
  totalValue,
  changePercent,
  isEmpty,
}: {
  totalValue: number;
  changePercent: number;
  isEmpty: boolean;
}) {
  if (isEmpty) {
    return (
      <div className="glass-card rounded-xl p-6 border border-dashed border-[#1e2030]">
        <div className="flex items-center gap-3 text-[#475569] mb-2">
          <Wallet size={20} />
          <span className="text-sm font-medium">Portfolio Overview</span>
        </div>
        <p className="text-[#94a3b8] text-sm mb-4">No holdings yet. Add assets to track your portfolio.</p>
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1a1d2e] text-[#00f5ff] text-sm font-medium hover:bg-[#252840] transition-colors"
        >
          <Wallet size={14} /> Go to Portfolio
        </Link>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-xl p-6">
      <div className="flex items-center gap-3 text-[#94a3b8] mb-2">
        <Wallet size={20} />
        <span className="text-sm font-medium">Portfolio Overview</span>
      </div>
      <p className="text-2xl md:text-3xl font-bold text-[#e2e8f0] tabular-nums">
        ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </p>
      <p className="text-sm mt-1">
        <PctChange value={changePercent} /> <span className="text-[#475569]">24h change</span>
      </p>
    </div>
  );
}

function TopMoversSkeleton() {
  return (
    <div className="glass-card rounded-xl p-6">
      <div className="h-4 w-32 skeleton rounded mb-4" />
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center justify-between py-2">
            <div className="h-8 w-24 skeleton rounded" />
            <div className="h-6 w-16 skeleton rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

function TopMoversCard({ assets }: { assets: Asset[] }) {
  const gainers = [...assets]
    .filter((a) => a.changePercent24h > 0)
    .sort((a, b) => b.changePercent24h - a.changePercent24h)
    .slice(0, 5);
  const losers = [...assets]
    .filter((a) => a.changePercent24h < 0)
    .sort((a, b) => a.changePercent24h - b.changePercent24h)
    .slice(0, 3);

  return (
    <div className="glass-card rounded-xl p-6">
      <div className="flex items-center gap-3 text-[#94a3b8] mb-4">
        <TrendingUp size={20} />
        <span className="text-sm font-medium">Top Movers</span>
      </div>
      <div className="space-y-4">
        <div>
          <p className="text-xs text-[#475569] mb-2 uppercase tracking-wider">Top Gainers</p>
          <div className="space-y-2">
            {gainers.map((a) => (
              <Link
                key={a.symbol}
                href={`/assets/${a.symbol}`}
                className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-[#1a1d2e] transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1a1d2e] flex items-center justify-center text-xs font-bold text-[#00f5ff] border border-[#1e2030]">
                    {a.symbol.slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#e2e8f0] group-hover:text-[#00f5ff] transition-colors">
                      {a.symbol}
                    </p>
                    <p className="text-xs text-[#475569] truncate max-w-[120px]">{a.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-mono text-[#e2e8f0]">${formatPrice(a.price)}</p>
                  <p className="text-xs">
                    <PctChange value={a.changePercent24h} />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs text-[#475569] mb-2 uppercase tracking-wider">Top Losers</p>
          <div className="space-y-2">
            {losers.map((a) => (
              <Link
                key={a.symbol}
                href={`/assets/${a.symbol}`}
                className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-[#1a1d2e] transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1a1d2e] flex items-center justify-center text-xs font-bold text-[#00f5ff] border border-[#1e2030]">
                    {a.symbol.slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#e2e8f0] group-hover:text-[#00f5ff] transition-colors">
                      {a.symbol}
                    </p>
                    <p className="text-xs text-[#475569] truncate max-w-[120px]">{a.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-mono text-[#e2e8f0]">${formatPrice(a.price)}</p>
                  <p className="text-xs">
                    <PctChange value={a.changePercent24h} />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function WatchlistPreview({ assets }: { assets: Asset[] }) {
  if (assets.length === 0) return null;

  return (
    <div className="glass-card rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3 text-[#94a3b8]">
          <LineChart size={20} />
          <span className="text-sm font-medium">Watchlist</span>
        </div>
        <Link
          href="/watchlist"
          className="text-xs text-[#00f5ff] hover:underline"
        >
          View all
        </Link>
      </div>
      <div className="space-y-2">
        {assets.slice(0, 4).map((a) => (
          <Link
            key={a.symbol}
            href={`/assets/${a.symbol}`}
            className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-[#1a1d2e] transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#1a1d2e] flex items-center justify-center text-xs font-bold text-[#00f5ff] border border-[#1e2030]">
                {a.symbol.slice(0, 2)}
              </div>
              <p className="text-sm font-medium text-[#e2e8f0] group-hover:text-[#00f5ff] transition-colors">
                {a.symbol}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-mono text-[#e2e8f0]">${formatPrice(a.price)}</p>
              <p className="text-xs">
                <PctChange value={a.changePercent24h} />
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { assets, isLoading } = useAllAssets();
  const portfolio = useMarketStore((s) => s.portfolio);
  const watchlist = useMarketStore((s) => s.watchlist);
  const getPortfolioValue = useMarketStore((s) => s.getPortfolioValue);
  const getPortfolioChange = useMarketStore((s) => s.getPortfolioChange);
  const getAssetBySymbol = useMarketStore((s) => s.getAssetBySymbol);

  const totalValue = getPortfolioValue();
  const changePercent = getPortfolioChange();
  const portfolioEmpty = portfolio.length === 0;

  const watchlistAssets = watchlist
    .map((w) => getAssetBySymbol(w.symbol))
    .filter((a): a is Asset => a !== undefined);

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-xl md:text-2xl font-bold text-[#e2e8f0] mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Portfolio Overview */}
          <div className="lg:col-span-1">
            {isLoading ? (
              <PortfolioOverviewSkeleton />
            ) : (
              <PortfolioOverviewCard
                totalValue={totalValue}
                changePercent={changePercent}
                isEmpty={portfolioEmpty}
              />
            )}
          </div>

          {/* Top Movers */}
          <div className="lg:col-span-2">
            {isLoading ? (
              <TopMoversSkeleton />
            ) : (
              <TopMoversCard assets={assets} />
            )}
          </div>
        </div>

        {/* Watchlist Preview */}
        {watchlistAssets.length > 0 && (
          <div className="mt-6">
            {isLoading ? (
              <div className="glass-card rounded-xl p-6">
                <div className="h-4 w-24 skeleton rounded mb-4" />
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-12 skeleton rounded" />
                  ))}
                </div>
              </div>
            ) : (
              <WatchlistPreview assets={watchlistAssets} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
