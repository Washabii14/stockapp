'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthProvider';

interface RouteGuardProps {
  children: React.ReactNode;
  fallbackUrl?: string;
}

export function RouteGuard({ children, fallbackUrl = '/login' }: RouteGuardProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      const redirect = `${fallbackUrl}?redirect=${encodeURIComponent(pathname)}`;
      router.replace(redirect);
    }
  }, [user, loading, router, fallbackUrl, pathname]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="glass-card rounded-xl p-8 animate-pulse">
          <div className="h-4 w-32 skeleton rounded mb-4" />
          <div className="h-4 w-48 skeleton rounded" />
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
