import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './config';
import type { WatchlistItem } from '@/store/useMarketStore';
import type { PortfolioHolding } from '@/store/useMarketStore';

const USERS_COLLECTION = 'users';

export interface UserData {
  watchlist: WatchlistItem[];
  portfolio: PortfolioHolding[];
  compareAssets: string[];
  updatedAt: number;
}

const DEFAULT_USER_DATA: UserData = {
  watchlist: [
    { symbol: 'BTC', type: 'crypto' },
    { symbol: 'ETH', type: 'crypto' },
    { symbol: 'AAPL', type: 'stock' },
    { symbol: 'NVDA', type: 'stock' },
  ],
  portfolio: [
    { symbol: 'BTC', type: 'crypto', quantity: 0.5, buyPrice: 45000 },
    { symbol: 'ETH', type: 'crypto', quantity: 5, buyPrice: 2800 },
    { symbol: 'AAPL', type: 'stock', quantity: 10, buyPrice: 175 },
    { symbol: 'NVDA', type: 'stock', quantity: 3, buyPrice: 650 },
  ],
  compareAssets: ['BTC', 'ETH'],
  updatedAt: Date.now(),
};

export async function getUserData(uid: string): Promise<UserData | null> {
  try {
    const userRef = doc(db, USERS_COLLECTION, uid);
    const snapshot = await getDoc(userRef);
    if (snapshot.exists()) {
      const data = snapshot.data();
      return {
        watchlist: data.watchlist ?? DEFAULT_USER_DATA.watchlist,
        portfolio: data.portfolio ?? DEFAULT_USER_DATA.portfolio,
        compareAssets: data.compareAssets ?? DEFAULT_USER_DATA.compareAssets,
        updatedAt: data.updatedAt ?? Date.now(),
      };
    }
    return null;
  } catch (error) {
    console.error('Firestore getUserData error:', error);
    throw error;
  }
}

export async function createOrUpdateUserData(
  uid: string,
  data: Partial<UserData>
): Promise<void> {
  try {
    const userRef = doc(db, USERS_COLLECTION, uid);
    const payload = {
      ...data,
      updatedAt: Date.now(),
    };
    await setDoc(userRef, payload, { merge: true });
  } catch (error) {
    console.error('Firestore createOrUpdateUserData error:', error);
    throw error;
  }
}

export async function updateUserWatchlist(
  uid: string,
  watchlist: WatchlistItem[]
): Promise<void> {
  const userRef = doc(db, USERS_COLLECTION, uid);
  await setDoc(userRef, { watchlist, updatedAt: Date.now() }, { merge: true });
}

export async function updateUserPortfolio(
  uid: string,
  portfolio: PortfolioHolding[]
): Promise<void> {
  const userRef = doc(db, USERS_COLLECTION, uid);
  await setDoc(userRef, { portfolio, updatedAt: Date.now() }, { merge: true });
}

export async function ensureUserDocument(
  uid: string,
  existingData: UserData | null
): Promise<UserData> {
  const userRef = doc(db, USERS_COLLECTION, uid);
  const snapshot = await getDoc(userRef);

  if (snapshot.exists()) {
    const data = snapshot.data();
    return {
      watchlist: data.watchlist ?? DEFAULT_USER_DATA.watchlist,
      portfolio: data.portfolio ?? DEFAULT_USER_DATA.portfolio,
      compareAssets: data.compareAssets ?? DEFAULT_USER_DATA.compareAssets,
      updatedAt: data.updatedAt ?? Date.now(),
    };
  }

  const initialData: UserData = existingData ?? DEFAULT_USER_DATA;
  await setDoc(userRef, initialData);
  return initialData;
}

export { DEFAULT_USER_DATA };
