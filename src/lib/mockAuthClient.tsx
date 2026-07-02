'use client';

import React, { useEffect, useState } from 'react';
import { loginAsMockUser } from '@/app/actions/mutations';

export function ClerkProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function useUser() {
  const [userState, setUserState] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
    };
    
    const userId = getCookie('mock_user_id');
    if (userId) {
      if (userId === 'test_admin_user_id') {
        setUserState({
          id: 'test_admin_user_id',
          firstName: 'Test',
          lastName: 'Admin',
          imageUrl: 'https://ui-avatars.com/api/?name=Test+Admin',
          publicMetadata: { role: 'district_admin' }
        });
      } else if (userId === 'user_0') {
        setUserState({
          id: 'user_0',
          firstName: 'Arjun',
          lastName: 'Kumar',
          imageUrl: 'https://ui-avatars.com/api/?name=Arjun+Kumar&background=random',
          publicMetadata: { role: 'member' }
        });
      } else if (userId === 'user_1') {
        setUserState({
          id: 'user_1',
          firstName: 'Priya',
          lastName: 'Sharma',
          imageUrl: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=random',
          publicMetadata: { role: 'member' }
        });
      } else if (userId === 'user_2') {
        setUserState({
          id: 'user_2',
          firstName: 'Karthik',
          lastName: 'Reddy',
          imageUrl: 'https://ui-avatars.com/api/?name=Karthik+Reddy&background=random',
          publicMetadata: { role: 'club_admin' }
        });
      } else {
        // Fallback for custom dynamically-provisioned chartered club users
        const role = userId.includes('president') ? 'club_admin' : userId.includes('secretary') ? 'club_admin' : 'member';
        setUserState({
          id: userId,
          firstName: 'Simulated',
          lastName: 'User',
          imageUrl: 'https://ui-avatars.com/api/?name=Simulated+User',
          publicMetadata: { role }
        });
      }
    } else {
      setUserState(null);
    }
    setIsLoaded(true);
  }, []);

  return {
    isSignedIn: userState !== null,
    isLoaded,
    user: userState
  };
}

export function UserButton() {
  const { user, isSignedIn } = useUser();
  const [showDropdown, setShowDropdown] = useState(false);
  const initials = user ? `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}` : '';
  
  if (!isSignedIn || !user) {
    return (
      <a href="/sign-in" className="text-[10px] font-black uppercase tracking-wider text-primary border border-primary/20 bg-primary/5 px-4 py-1.5 rounded-full hover:bg-primary/10 transition-all no-underline">
        Sign In
      </a>
    );
  }

  const handleSignOut = async () => {
    const { logoutUser } = await import('@/app/actions/mutations');
    const dest = await logoutUser();
    window.location.href = dest;
  };

  return (
    <div className="relative">
      <div 
        onClick={() => setShowDropdown(!showDropdown)}
        className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-primary text-white text-xs font-black cursor-pointer shadow-md border border-white/20 hover:scale-105 active:scale-95 transition-all select-none" 
        title={`${user.firstName} ${user.lastName}`}
      >
        {initials || 'U'}
      </div>

      {showDropdown && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)}></div>
          <div className="absolute right-0 mt-3 w-48 bg-[#091124] border border-white/10 rounded-2xl shadow-xl z-50 p-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="px-4 py-3 border-b border-white/5">
              <p className="text-xs font-bold text-white truncate">{user.firstName} {user.lastName}</p>
              <p className="text-[9px] text-text-muted uppercase tracking-wider truncate mt-0.5 font-sans font-semibold">{user.publicMetadata?.role}</p>
            </div>
            <a 
              href="/dashboard"
              className="flex items-center gap-3 px-4 py-2.5 text-xs text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all no-underline font-sans mt-1"
              onClick={() => setShowDropdown(false)}
            >
              <span className="material-symbols-outlined text-sm">dashboard</span>
              Dashboard
            </a>
            <a 
              href="/profile"
              className="flex items-center gap-3 px-4 py-2.5 text-xs text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all no-underline font-sans"
              onClick={() => setShowDropdown(false)}
            >
              <span className="material-symbols-outlined text-sm">person</span>
              My Profile
            </a>
            <button 
              onClick={handleSignOut}
              className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/5 rounded-xl transition-all font-sans cursor-pointer border-0 bg-transparent"
            >
              <span className="material-symbols-outlined text-sm">logout</span>
              Sign Out
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export function SignUp(props: any) {
  return <SignIn {...props} />;
}

export function SignIn(props: any) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleLogin = async (userId: string) => {
    setLoadingId(userId);
    try {
      const dest = await loginAsMockUser(userId);
      window.location.href = dest;
    } catch (err) {
      console.error(err);
      alert('Mock login failed');
      setLoadingId(null);
    }
  };

  const roles = [
    {
      id: 'test_admin_user_id',
      title: 'District Administrator',
      subtitle: 'Test Admin (district_admin)',
      desc: 'District-wide configurations (settings, override counts, announcements, leaderboards).',
      icon: 'admin_panel_settings',
      badgeClass: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    },
    {
      id: 'user_2',
      title: 'Club Administrator',
      subtitle: 'Karthik Reddy (club_admin)',
      desc: 'Club-level command center (manage club profile, events, minutes, and local members).',
      icon: 'shield_person',
      badgeClass: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    },
    {
      id: 'user_1',
      title: 'Active Member',
      subtitle: 'Priya Sharma (member)',
      desc: 'Standard member portal (track service hours, view directories, register for events).',
      icon: 'person',
      badgeClass: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    }
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-2 text-center">
        <h2 className="text-xl font-bold uppercase tracking-wider text-white">Select Portal Identity</h2>
        <p className="text-xs text-text-muted opacity-60">Simulate role-based portal access with pre-configured mock accounts.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => handleLogin(role.id)}
            disabled={loadingId !== null}
            className="w-full text-left p-6 rounded-2xl bg-white/3 border border-white/5 hover:border-primary/30 hover:bg-white/5 transition-all duration-300 flex items-center justify-between group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed bg-transparent"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-105 transition-transform shrink-0">
                {loadingId === role.id ? (
                  <span className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin"></span>
                ) : (
                  <span className="material-symbols-outlined text-2xl">{role.icon}</span>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white uppercase tracking-tight">{role.title}</span>
                  <span className={`text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${role.badgeClass}`}>{role.subtitle.split(' ')[0]}</span>
                </div>
                <p className="text-[11px] text-text-muted opacity-60 mt-1 leading-snug">{role.desc}</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-white/30 group-hover:text-primary transition-colors text-sm group-hover:translate-x-1 duration-300">arrow_forward</span>
          </button>
        ))}
      </div>
    </div>
  );
}
