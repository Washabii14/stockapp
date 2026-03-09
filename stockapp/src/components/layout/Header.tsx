'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, Bell, Menu, X, User, LogOut, Settings } from 'lucide-react';
import { clsx } from 'clsx';
import { useMarketStore } from '@/store/useMarketStore';
import { useAuth } from '@/components/auth/AuthProvider';
import { signOut } from '@/lib/firebase/auth';
import { mockStocks } from '@/lib/mock/stocks';
import { mockCrypto } from '@/lib/mock/crypto';

export default function Header() {
  const { setSidebarCollapsed, sidebarCollapsed } = useMarketStore();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const allAssets = [...mockStocks, ...mockCrypto];
  const filteredAssets = searchQuery.length > 1
    ? allAssets.filter(a =>
        a.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.name.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6)
    : [];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearch(true);
        setTimeout(() => searchRef.current?.focus(), 50);
      }
      if (e.key === 'Escape') {
        setShowSearch(false);
        setShowProfile(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleAssetSelect = (symbol: string) => {
    router.push(`/assets/${symbol}`);
    setSearchQuery('');
    setShowSearch(false);
  };

  const pctChange = (pct: number) => (
    <span className={pct >= 0 ? 'text-[#39ff14]' : 'text-[#ff4757]'}>
      {pct >= 0 ? '+' : ''}{pct.toFixed(2)}%
    </span>
  );

  return (
    <header className="fixed top-0 right-0 left-0 md:left-0 z-20 h-16 flex items-center px-4 gap-3 border-b border-[#1e2030] bg-[#0b0d12]/80 backdrop-blur-md"
      style={{ paddingLeft: `calc(1rem + ${sidebarCollapsed ? '4rem' : '15rem'})` }}
    >
      {/* Mobile menu button */}
      <button
        className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-[#475569] hover:text-[#e2e8f0] hover:bg-[#1a1d2e] transition-colors"
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
      >
        {sidebarCollapsed ? <Menu size={18} /> : <X size={18} />}
      </button>

      {/* Search */}
      <div className="flex-1 max-w-xl relative">
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1a1d2e] border border-[#1e2030] cursor-text hover:border-[#252840] transition-colors group"
          onClick={() => { setShowSearch(true); setTimeout(() => searchRef.current?.focus(), 50); }}
        >
          <Search size={15} className="text-[#475569] group-hover:text-[#94a3b8] transition-colors flex-shrink-0" />
          {showSearch ? (
            <input
              ref={searchRef}
              type="text"
              placeholder="Search stocks, crypto..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm text-[#e2e8f0] placeholder-[#475569] outline-none"
              onBlur={() => setTimeout(() => { setShowSearch(false); setSearchQuery(''); }, 200)}
              autoFocus
            />
          ) : (
            <span className="flex-1 text-sm text-[#475569]">Search stocks, crypto...</span>
          )}
          <kbd className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] text-[#475569] border border-[#1e2030] font-mono">
            ⌘K
          </kbd>
        </div>

        {/* Search Dropdown */}
        {showSearch && filteredAssets.length > 0 && (
          <div className="absolute top-full mt-2 left-0 right-0 glass-card rounded-xl overflow-hidden shadow-card z-50 animate-slide-up">
            {filteredAssets.map((asset) => (
              <button
                key={asset.symbol}
                onMouseDown={() => handleAssetSelect(asset.symbol)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#1a1d2e] transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1a1d2e] flex items-center justify-center text-xs font-bold text-[#00f5ff] border border-[#1e2030]">
                    {asset.symbol.slice(0, 2)}
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-semibold text-[#e2e8f0]">{asset.symbol}</div>
                    <div className="text-xs text-[#475569]">{asset.name}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-mono text-[#e2e8f0]">
                    ${asset.price.toLocaleString('en-US', { minimumFractionDigits: asset.price < 1 ? 4 : 2, maximumFractionDigits: asset.price < 1 ? 4 : 2 })}
                  </div>
                  <div className="text-xs">{pctChange(asset.changePercent24h)}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 ml-auto">
        <button className="relative w-9 h-9 rounded-lg flex items-center justify-center text-[#475569] hover:text-[#e2e8f0] hover:bg-[#1a1d2e] transition-colors">
          <Bell size={17} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#00f5ff]" />
        </button>

        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-[#1a1d2e] transition-colors group"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#00f5ff] to-[#a55eea] flex items-center justify-center text-xs font-bold text-black">
              {user?.email?.charAt(0).toUpperCase() ?? 'G'}
            </div>
            <span className="hidden sm:block text-xs text-[#94a3b8] max-w-[120px] truncate">
              {user?.email ?? 'Guest'}
            </span>
          </button>

          {showProfile && (
            <div className="absolute right-0 top-full mt-2 w-52 glass-card rounded-xl overflow-hidden shadow-card z-50 animate-slide-up">
              <div className="px-4 py-3 border-b border-[#1e2030]">
                <p className="text-xs text-[#475569]">Signed in as</p>
                <p className="text-sm font-medium text-[#e2e8f0] truncate">{user?.email ?? 'guest@example.com'}</p>
              </div>
              <div className="py-1">
                <Link href="/settings" className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#94a3b8] hover:text-[#e2e8f0] hover:bg-[#1a1d2e] transition-colors">
                  <Settings size={14} /> Settings
                </Link>
                {user ? (
                  <button
                    onClick={signOut}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#ff4757] hover:bg-[#1a1d2e] transition-colors"
                  >
                    <LogOut size={14} /> Sign out
                  </button>
                ) : (
                  <Link href="/login" className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#00f5ff] hover:bg-[#1a1d2e] transition-colors">
                    <User size={14} /> Sign in
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
