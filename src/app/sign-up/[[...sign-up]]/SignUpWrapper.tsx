"use client";

import dynamic from 'next/dynamic';

const SignUp = dynamic(() => import('@/lib/mockAuthClient').then(mod => mod.SignUp), { ssr: false });

export default function SignUpWrapper() {
  return <SignUp />;
}
