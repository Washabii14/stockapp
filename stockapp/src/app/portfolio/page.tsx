'use client';

import Link from 'next/link';
import { Wallet, Trash2, ArrowLeft } from 'lucide-react';
import { useMarketStore } from '@/store/useMarketStore';
import { usePortfolioActions } from '@/hooks/usePortfolioActions';
import { useAllAssets } from '@/hooks/useAssetData';
import { RouteGuard } from '@/components/auth/RouteGuard';
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

function PortfolioContent() {
  const { assets, isLoading } = useAllAssets();
  const portfolio = useMarketStore((s) => s.portfolio);
  const { removeHoldingSync } = usePortfolioActions();
  const getPortfolioValue = useMarketStore((s) => s.getPortfolioValue);
  const getPortfolioChange = useMarketStore((s) => s.getPortfolioChange);
  const getAssetBySymbol = useMarketStore((s) => s.getAssetBySymbol);

  const totalValue = getPortfolioValue();
  const changePercent = getPortfolioChange();
  const portfolioWithAssets = portfolio
    .map((h) => {
      const asset = getAssetBySymbol(h.symbol);
      return asset ? { ...h, asset } : null;
    })
    .filter((item): item is typeof item & { asset: Asset } => item !== null);

  if (isLoading) {
    return (
      <div className="p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-xl md:text-2xl font-bold text-[#e2e8f0] mb-6">Portfolio</h1>
          <div className="glass-card rounded-xl p-6">
            <div className="h-8 w-48 skeleton rounded mb-4" />
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-16 skeleton rounded" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#94a3b8] hover:text-[#00f5ff] mb-6 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>

        <h1 className="text-xl md:text-2xl font-bold text-[#e2e8f0] mb-6">Portfolio</h1>

        <div className="glass-card rounded-xl p-6 mb-6">
          <div className="flex items-center gap-3 text-[#94a3b8] mb-2">
            <Wallet size={20} />
            <span className="text-sm font-medium">Total Value</span>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-[#e2e8f0] tabular-nums">
            ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className="text-sm mt-1">
            <PctChange value={changePercent} /> <span className="text-[#475569]">24h change</span>
          </p>
        </div>

        <div className="glass-card rounded-xl overflow-hidden">
          <div className="hidden md:grid md:grid-cols-12 gap-4 px-4 py-3 border-b border-[#1e2030] text-xs font-medium text-[#475569] uppercase tracking-wider">
            <div className="md:col-span-4">Asset</div>
            <div className="md:col-span-2">Holdings</div>
            <div className="md:col-span-2 text-right">Avg Cost</div>
            <div className="md:col-span-2 text-right">Current</div>
            <div className="md:col-span-2 text-right">24h</div>
          </div>
          <div className="divide-y divide-[#1e2030]">
            {portfolioWithAssets.map(({ symbol, quantity, buyPrice, asset }) => {
              const currentValue = asset.price * quantity;
              const costBasis = buyPrice * quantity;
              const pnl = ((currentValue - costBasis) / costBasis) * 100;
              return (
                <div
                  key={symbol}
                  className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 px-4 py-4 md:py-3 items-center hover:bg-[#0f1117]/50 transition-colors"
                >
                  <div className="md:col-span-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#1a1d2e] flex items-center justify-center text-sm font-bold text-[#00f5ff] border border-[#1e2030]">
                      {symbol.slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#e2e8f0]">{symbol}</p>
                      <p className="text-xs text-[#475569]">{asset.name}</p>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm font-mono text-[#e2e8f0] tabular-nums">{quantity}</p>
                  </div>
                  <div className="md:col-span-2 text-right">
                    <p className="text-sm font-mono text-[#94a3b8]">${formatPrice(buyPrice)}</p>
                  </div>
                  <div className="md:col-span-2 text-right">
                    <p className="text-sm font-mono text-[#e2e8f0]">${formatPrice(asset.price)}</p>
                  </div>
                  <div className="md:col-span-2 flex justify-between md:justify-end items-center">
                    <PctChange value={asset.changePercent24h} />
                    <button
                      onClick={() => removeHoldingSync(symbol)}
                      className="p-2 rounded-lg text-[#475569] hover:text-[#ff4757] hover:bg-[#1a1d2e] transition-colors"
                      title="Remove holding"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  return (
    <RouteGuard fallbackUrl="/login">
      <PortfolioContent />
    </RouteGuard>
  );
}
