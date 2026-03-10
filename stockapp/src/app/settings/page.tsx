'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, User, Mail, LogOut } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthProvider';
import { signOut } from '@/lib/firebase/auth';
import { RouteGuard } from '@/components/auth/RouteGuard';

function SettingsContent() {
  const router = useRouter();
  const { user } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    router.replace('/');
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#94a3b8] hover:text-[#00f5ff] mb-6 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>

        <h1 className="text-xl md:text-2xl font-bold text-[#e2e8f0] mb-6">Settings</h1>

        <div className="glass-card rounded-xl p-6 space-y-6">
          <div className="flex items-center gap-4 pb-6 border-b border-[#1e2030]">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00f5ff] to-[#a55eea] flex items-center justify-center text-2xl font-bold text-black">
              {user?.email?.charAt(0).toUpperCase() ?? '?'}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#e2e8f0]">Profile</h2>
              <p className="text-sm text-[#94a3b8]">Manage your account</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-[#1a1d2e] border border-[#1e2030]">
              <Mail size={20} className="text-[#475569]" />
              <div>
                <p className="text-xs text-[#475569]">Email</p>
                <p className="text-sm font-medium text-[#e2e8f0]">{user?.email ?? '—'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-[#1a1d2e] border border-[#1e2030]">
              <User size={20} className="text-[#475569]" />
              <div>
                <p className="text-xs text-[#475569]">User ID</p>
                <p className="text-xs font-mono text-[#94a3b8] truncate max-w-[280px]">
                  {user?.uid ?? '—'}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-[#1a1d2e] border border-[#ff4757]/30 text-[#ff4757] font-medium hover:bg-[#ff4757]/10 transition-colors"
          >
            <LogOut size={18} /> Sign out
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <RouteGuard fallbackUrl="/login">
      <SettingsContent />
    </RouteGuard>
  );
}
