'use client';

import { deleteUser } from '@/app/actions/mutations';

export default function DeleteUserButton({ userId }: { userId: string }) {
  return (
    <form action={deleteUser.bind(null, userId)}>
      <button type="submit" className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-red-500/30 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all flex items-center justify-center">
        <span className="material-symbols-outlined text-base">person_remove</span>
      </button>
    </form>
  );
}
