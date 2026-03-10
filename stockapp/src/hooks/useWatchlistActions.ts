'use client';

import { useCallback } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { useMarketStore } from '@/store/useMarketStore';
import { updateUserWatchlist } from '@/lib/firebase/firestore';
import toast from 'react-hot-toast';
import type { WatchlistItem } from '@/store/useMarketStore';

export function useWatchlistActions() {
  const { user } = useAuth();
  const watchlist = useMarketStore((s) => s.watchlist);
  const addToWatchlist = useMarketStore((s) => s.addToWatchlist);
  const removeFromWatchlist = useMarketStore((s) => s.removeFromWatchlist);

  const addToWatchlistSync = useCallback(
    async (item: WatchlistItem) => {
      if (watchlist.some((w) => w.symbol === item.symbol)) return;

      const newWatchlist = [...watchlist, item];

      if (user) {
        try {
          await updateUserWatchlist(user.uid, newWatchlist);
          addToWatchlist(item);
        } catch (err) {
          console.error('Failed to add to watchlist:', err);
          toast.error('Failed to save. Please try again.');
        }
      } else {
        addToWatchlist(item);
      }
    },
    [user, watchlist, addToWatchlist]
  );

  const removeFromWatchlistSync = useCallback(
    async (symbol: string) => {
      const newWatchlist = watchlist.filter((w) => w.symbol !== symbol);

      if (user) {
        try {
          await updateUserWatchlist(user.uid, newWatchlist);
          removeFromWatchlist(symbol);
        } catch (err) {
          console.error('Failed to remove from watchlist:', err);
          toast.error('Failed to save. Please try again.');
        }
      } else {
        removeFromWatchlist(symbol);
      }
    },
    [user, watchlist, removeFromWatchlist]
  );

  return { addToWatchlistSync, removeFromWatchlistSync };
}
