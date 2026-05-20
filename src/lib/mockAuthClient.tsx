'use client';

import React from 'react';

export function ClerkProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function useUser() {
  return {
    isSignedIn: true,
    isLoaded: true,
    user: {
      id: "test_admin_user_id",
      firstName: "Test",
      lastName: "Admin",
      imageUrl: "https://ui-avatars.com/api/?name=Test+Admin",
      publicMetadata: { role: "district_admin" }
    }
  };
}

export function UserButton() {
  return (
    <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-primary text-white text-xs font-black cursor-pointer shadow-md border border-white/20 hover:scale-105 active:scale-95 transition-all" title="Test Admin">
      TA
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
