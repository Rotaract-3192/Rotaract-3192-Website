"use client";

import dynamic from 'next/dynamic';

const SignIn = dynamic(() => import('@/lib/mockAuthClient').then(mod => mod.SignIn), { ssr: false });

export default function SignInWrapper() {
  return <SignIn />;
}
