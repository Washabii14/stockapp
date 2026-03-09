import Link from 'next/link';
import { Search, ArrowLeft } from 'lucide-react';

export default function AssetNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="glass-card rounded-xl p-8 md:p-12 text-center max-w-md border border-dashed border-[#1e2030]">
        <div className="w-16 h-16 rounded-full bg-[#1a1d2e] flex items-center justify-center mx-auto mb-4">
          <Search size={32} className="text-[#475569]" />
        </div>
        <h1 className="text-xl font-semibold text-[#e2e8f0] mb-2">Asset not found</h1>
        <p className="text-sm text-[#94a3b8] mb-6">
          The symbol you&apos;re looking for doesn&apos;t exist or isn&apos;t available. Try searching for a different stock or crypto.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#1a1d2e] text-[#00f5ff] text-sm font-medium hover:bg-[#252840] transition-colors"
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
          <Link
            href="/watchlist"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[#1e2030] text-[#94a3b8] text-sm font-medium hover:bg-[#1a1d2e] hover:text-[#e2e8f0] transition-colors"
          >
            View Watchlist
          </Link>
        </div>
      </div>
    </div>
  );
}
