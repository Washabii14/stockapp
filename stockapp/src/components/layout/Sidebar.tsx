'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, TrendingUp, Wallet, GitCompare, Settings, 
  LineChart, X, ChevronLeft, ChevronRight, Zap
} from 'lucide-react';
import { clsx } from 'clsx';
import { useMarketStore } from '@/store/useMarketStore';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/markets', label: 'Markets', icon: TrendingUp },
  { href: '/portfolio', label: 'Portfolio', icon: Wallet },
  { href: '/compare', label: 'Compare', icon: GitCompare },
  { href: '/watchlist', label: 'Watchlist', icon: LineChart },
];

const bottomNavItems = [
  { href: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, setSidebarCollapsed } = useMarketStore();

  return (
    <>
      {/* Mobile overlay */}
      <div 
        className={clsx(
          'fixed inset-0 z-20 mobile-overlay md:hidden transition-opacity duration-300',
          !sidebarCollapsed ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setSidebarCollapsed(true)}
      />

      {/* Sidebar */}
      <aside
        className={clsx(
          'fixed left-0 top-0 h-full z-30 flex flex-col',
          'transition-all duration-300 ease-in-out',
          'border-r border-[#1e2030]',
          'bg-[#0b0d12]',
          // Desktop: always visible, collapse to icons
          'md:translate-x-0',
          sidebarCollapsed ? 'md:w-16' : 'md:w-60',
          // Mobile: full width as drawer
          !sidebarCollapsed ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0'
        )}
      >
        {/* Logo */}
        <div className={clsx(
          'flex items-center h-16 px-4 border-b border-[#1e2030]',
          sidebarCollapsed ? 'justify-center' : 'justify-between'
        )}>
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00f5ff] to-[#a55eea] flex items-center justify-center flex-shrink-0 group-hover:shadow-[0_0_20px_rgba(0,245,255,0.4)] transition-shadow">
              <Zap size={16} className="text-black" />
            </div>
            {!sidebarCollapsed && (
              <span className="font-bold text-base text-white tracking-tight">
                StockPulse
              </span>
            )}
          </Link>
          {!sidebarCollapsed && (
            <button
              onClick={() => setSidebarCollapsed(true)}
              className="hidden md:flex items-center justify-center w-6 h-6 rounded text-[#475569] hover:text-[#e2e8f0] hover:bg-[#1a1d2e] transition-colors"
            >
              <ChevronLeft size={14} />
            </button>
          )}
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== '/' && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                onClick={() => { if (window.innerWidth < 768) setSidebarCollapsed(true); }}
                className={clsx(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group',
                  active
                    ? 'bg-[#1a1d2e] text-[#00f5ff] shadow-inner'
                    : 'text-[#94a3b8] hover:text-[#e2e8f0] hover:bg-[#161826]',
                  sidebarCollapsed && 'md:justify-center md:px-0'
                )}
                title={sidebarCollapsed ? label : undefined}
              >
                <Icon
                  size={18}
                  className={clsx(
                    'flex-shrink-0 transition-colors',
                    active ? 'text-[#00f5ff]' : 'text-[#475569] group-hover:text-[#94a3b8]'
                  )}
                />
                {!sidebarCollapsed && <span>{label}</span>}
                {active && !sidebarCollapsed && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#00f5ff]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Items */}
        <div className="px-2 py-4 border-t border-[#1e2030] space-y-0.5">
          {bottomNavItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group',
                'text-[#94a3b8] hover:text-[#e2e8f0] hover:bg-[#161826]',
                sidebarCollapsed && 'md:justify-center md:px-0'
              )}
              title={sidebarCollapsed ? label : undefined}
            >
              <Icon size={18} className="flex-shrink-0 text-[#475569] group-hover:text-[#94a3b8] transition-colors" />
              {!sidebarCollapsed && <span>{label}</span>}
            </Link>
          ))}

          {/* Collapse toggle (desktop only) */}
          {sidebarCollapsed && (
            <button
              onClick={() => setSidebarCollapsed(false)}
              className="hidden md:flex w-full items-center justify-center px-3 py-2.5 rounded-lg text-[#475569] hover:text-[#e2e8f0] hover:bg-[#161826] transition-all"
              title="Expand sidebar"
            >
              <ChevronRight size={14} />
            </button>
          )}
        </div>
      </aside>
    </>
  );
}
