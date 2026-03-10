'use client';

import { useEffect } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { useMarketStore } from '@/store/useMarketStore';
import { getUserData, ensureUserDocument } from '@/lib/firebase/firestore';

export function useFirestoreSync() {
  const { user, loading } = useAuth();
  const setUserData = useMarketStore((s) => s.setUserData);
  const clearUserData = useMarketStore((s) => s.clearUserData);
  const watchlist = useMarketStore((s) => s.watchlist);
  const portfolio = useMarketStore((s) => s.portfolio);
  const compareAssets = useMarketStore((s) => s.compareAssets);

  useEffect(() => {
    if (loading) return;

    if (!user) {
      clearUserData();
      return;
    }

    const uid = user.uid;

    async function sync() {
      try {
        const existingData = await getUserData(uid);
        const userData = await ensureUserDocument(uid, existingData ?? {
          watchlist,
          portfolio,
          compareAssets,
          updatedAt: Date.now(),
        });
        setUserData({
          watchlist: userData.watchlist,
          portfolio: userData.portfolio,
          compareAssets: userData.compareAssets,
        });
      } catch (err) {
        console.error('Firestore sync failed:', err);
      }
    }

    sync();
  }, [user?.uid, loading]);
}
