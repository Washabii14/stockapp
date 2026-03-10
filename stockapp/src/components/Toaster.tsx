'use client';

import { Toaster as HotToaster } from 'react-hot-toast';

export function Toaster() {
  return (
    <HotToaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: '#1a1d2e',
          color: '#e2e8f0',
          border: '1px solid #1e2030',
        },
        success: {
          iconTheme: { primary: '#39ff14', secondary: '#0b0d12' },
        },
        error: {
          iconTheme: { primary: '#ff4757', secondary: '#0b0d12' },
        },
      }}
    />
  );
}
