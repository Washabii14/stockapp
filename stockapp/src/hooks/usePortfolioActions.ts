'use client';

import { useCallback } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { useMarketStore } from '@/store/useMarketStore';
import { updateUserPortfolio } from '@/lib/firebase/firestore';
import toast from 'react-hot-toast';
import type { PortfolioHolding } from '@/store/useMarketStore';

export function usePortfolioActions() {
  const { user } = useAuth();
  const portfolio = useMarketStore((s) => s.portfolio);
  const addHolding = useMarketStore((s) => s.addHolding);
  const removeHolding = useMarketStore((s) => s.removeHolding);

  const addHoldingSync = useCallback(
    async (holding: PortfolioHolding) => {
      const newPortfolio = [...portfolio.filter((p) => p.symbol !== holding.symbol), holding];

      if (user) {
        try {
          await updateUserPortfolio(user.uid, newPortfolio);
          addHolding(holding);
        } catch (err) {
          console.error('Failed to add holding:', err);
          toast.error('Failed to save. Please try again.');
        }
      } else {
        addHolding(holding);
      }
    },
    [user, portfolio, addHolding]
  );

  const removeHoldingSync = useCallback(
    async (symbol: string) => {
      const newPortfolio = portfolio.filter((p) => p.symbol !== symbol);

      if (user) {
        try {
          await updateUserPortfolio(user.uid, newPortfolio);
          removeHolding(symbol);
        } catch (err) {
          console.error('Failed to remove holding:', err);
          toast.error('Failed to save. Please try again.');
        }
      } else {
        removeHolding(symbol);
      }
    },
    [user, portfolio, removeHolding]
  );

  return { addHoldingSync, removeHoldingSync };
}
