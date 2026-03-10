'use client';

import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { LineChart, Plus, Check } from 'lucide-react';
import { useMarketStore } from '@/store/useMarketStore';
import { useWatchlistActions } from '@/hooks/useWatchlistActions';
import { useAllAssets } from '@/hooks/useAssetData';
import type { StockAsset } from '@/lib/mock/stocks';
import type { CryptoAsset } from '@/lib/mock/crypto';
import type { Timeframe } from '@/store/useMarketStore';
import type { OHLCVDataPoint } from '@/lib/mock/stocks';

type Asset = StockAsset | CryptoAsset;

const TIMEFRAMES: Timeframe[] = ['1D', '1W', '1M', '1Y', 'ALL'];

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

function getAssetType(asset: Asset): 'stock' | 'crypto' {
  return 'sector' in asset ? 'stock' : 'crypto';
}

function AssetHeaderSkeleton() {
  return (
    <div className="glass-card rounded-xl p-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 skeleton rounded-xl" />
          <div className="space-y-2">
            <div className="h-6 w-24 skeleton rounded" />
            <div className="h-4 w-32 skeleton rounded" />
          </div>
        </div>
        <div className="space-y-2 text-right">
          <div className="h-8 w-28 skeleton rounded ml-auto" />
          <div className="h-4 w-20 skeleton rounded ml-auto" />
        </div>
      </div>
    </div>
  );
}

function ChartSkeleton() {
  return (
    <div className="glass-card rounded-xl p-6 h-[320px] md:h-[400px]">
      <div className="h-full skeleton rounded" />
    </div>
  );
}

function PriceChart({ data }: { data: OHLCVDataPoint[] }) {
  const chartData = data.map((d) => ({
    ...d,
    displayDate: d.date,
    value: d.close,
  }));

  return (
    <div className="w-full h-[280px] md:h-[360px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00f5ff" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#00f5ff" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e2030" vertical={false} />
          <XAxis
            dataKey="displayDate"
            stroke="#475569"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            dataKey="value"
            stroke="#475569"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            orientation="right"
            domain={['auto', 'auto']}
            tickFormatter={(v) => `$${v >= 1 ? v.toFixed(2) : v.toFixed(4)}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0b0d12',
              border: '1px solid #1e2030',
              borderRadius: '8px',
            }}
            labelStyle={{ color: '#94a3b8' }}
            formatter={(value) => [typeof value === 'number' ? `$${formatPrice(value)}` : '—', 'Price']}
            labelFormatter={(label) => label}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#00f5ff"
            strokeWidth={2}
            fill="url(#priceGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function AssetDetailPage() {
  const params = useParams();
  const symbol = typeof params.symbol === 'string' ? params.symbol : '';

  const { assets, isLoading } = useAllAssets();
  const getAssetBySymbol = useMarketStore((s) => s.getAssetBySymbol);
  const selectedTimeframe = useMarketStore((s) => s.selectedTimeframe);
  const setTimeframe = useMarketStore((s) => s.setTimeframe);
  const isWatchlisted = useMarketStore((s) => s.isWatchlisted);
  const { addToWatchlistSync } = useWatchlistActions();

  const asset = getAssetBySymbol(symbol);

  if (!isLoading && !asset) {
    notFound();
  }

  if (isLoading || !asset) {
    return (
      <div className="p-4 md:p-6 lg:p-8">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#94a3b8] hover:text-[#00f5ff] mb-6 transition-colors"
          >
            ← Back to Dashboard
          </Link>
          <AssetHeaderSkeleton />
          <div className="glass-card rounded-xl p-4 mb-6">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {TIMEFRAMES.map((tf) => (
                <div key={tf} className="h-9 w-14 skeleton rounded-lg flex-shrink-0" />
              ))}
            </div>
          </div>
          <ChartSkeleton />
        </div>
      </div>
    );
  }

  const assetType = getAssetType(asset);
  const ohlcvData = asset.ohlcv[selectedTimeframe];
  const inWatchlist = isWatchlisted(symbol);

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#94a3b8] hover:text-[#00f5ff] mb-6 transition-colors"
        >
          ← Back to Dashboard
        </Link>

        {/* Asset Header */}
        <div className="glass-card rounded-xl p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-[#1a1d2e] flex items-center justify-center text-lg font-bold text-[#00f5ff] border border-[#1e2030]">
                {asset.symbol.slice(0, 2)}
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-[#e2e8f0]">{asset.symbol}</h1>
                <p className="text-sm text-[#94a3b8]">{asset.name}</p>
              </div>
              <button
                onClick={() =>
                  inWatchlist ? undefined : addToWatchlistSync({ symbol: asset.symbol, type: assetType })
                }
                disabled={inWatchlist}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  inWatchlist
                    ? 'bg-[#1a1d2e] text-[#39ff14] border border-[#1e2030] cursor-default'
                    : 'bg-[#1a1d2e] text-[#00f5ff] border border-[#1e2030] hover:bg-[#252840] hover:border-[#00f5ff]/50'
                }`}
              >
                {inWatchlist ? (
                  <>
                    <Check size={16} /> In Watchlist
                  </>
                ) : (
                  <>
                    <Plus size={16} /> Add to Watchlist
                  </>
                )}
              </button>
            </div>
            <div className="text-left md:text-right">
              <p className="text-2xl md:text-3xl font-bold text-[#e2e8f0] tabular-nums">
                ${formatPrice(asset.price)}
              </p>
              <p className="text-sm mt-1">
                <PctChange value={asset.changePercent24h} />{' '}
                <span className="text-[#475569]">24h</span>
              </p>
            </div>
          </div>
        </div>

        {/* Timeframe Selector */}
        <div className="glass-card rounded-xl p-4 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <LineChart size={18} className="text-[#94a3b8]" />
            <span className="text-sm font-medium text-[#94a3b8]">Price History</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {TIMEFRAMES.map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex-shrink-0 ${
                  selectedTimeframe === tf
                    ? 'bg-[#00f5ff] text-black'
                    : 'bg-[#1a1d2e] text-[#94a3b8] hover:text-[#e2e8f0] hover:bg-[#252840] border border-[#1e2030]'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="glass-card rounded-xl p-4 md:p-6">
          <PriceChart data={ohlcvData} />
        </div>
      </div>
    </div>
  );
}
