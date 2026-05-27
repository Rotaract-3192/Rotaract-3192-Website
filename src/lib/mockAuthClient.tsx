'use client';

import React, { useEffect, useState } from 'react';

export function ClerkProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function useUser() {
  const [userState, setUserState] = useState({
    id: "test_admin_user_id",
    firstName: "Test",
    lastName: "Admin",
    imageUrl: "https://ui-avatars.com/api/?name=Test+Admin",
    publicMetadata: { role: "district_admin" }
  });

  useEffect(() => {
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
    };
    
    const userId = getCookie('mock_user_id');
    if (userId) {
      if (userId === 'user_0') {
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
      }
    }
  }, []);

  return {
    isSignedIn: true,
    isLoaded: true,
    user: userState
  };
}

export function UserButton() {
  const { user } = useUser();
  const initials = `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`;
  
  return (
    <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-primary text-white text-xs font-black cursor-pointer shadow-md border border-white/20 hover:scale-105 active:scale-95 transition-all" title={`${user.firstName} ${user.lastName}`}>
      {initials || 'U'}
    </div>
  );
}

export function SignUp(props: any) {
  return (
    <div className="text-white p-10 bg-white/5 border border-white/10 rounded-3xl text-center space-y-6">
      <h2 className="text-2xl font-bold uppercase tracking-tight font-display">Testing Mode Active</h2>
      <p className="text-text-muted text-sm italic">Clerk auth is disabled for testing. You are automatically logged in as a test administrator.</p>
    </div>
  );
}

export function SignIn(props: any) {
  return (
    <div className="text-white p-10 bg-white/5 border border-white/10 rounded-3xl text-center space-y-6">
      <h2 className="text-2xl font-bold uppercase tracking-tight font-display">Testing Mode Active</h2>
      <p className="text-text-muted text-sm italic">Clerk auth is disabled for testing. You are automatically logged in as a test administrator.</p>
    </div>
  );
}
