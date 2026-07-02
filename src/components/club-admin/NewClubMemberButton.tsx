'use client';

import { useState, useRef } from 'react';
import SlidePanel from '@/components/SlidePanel';
import { createMember } from '@/app/actions/mutations';

export default function NewClubMemberButton({ clubId }: { clubId: string | null }) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <button onClick={() => setOpen(true)}
        className="flex items-center gap-3 bg-purple-600 text-white font-black uppercase tracking-[0.3em] text-[10px] px-8 py-4 rounded-xl shadow-xl shadow-purple-500/20 hover:scale-105 active:scale-95 transition-all font-sans cursor-pointer">
        <span className="material-symbols-outlined text-lg">person_add</span>
        Add Member
      </button>

      <SlidePanel open={open} onClose={() => { setOpen(false); setAvatarPreview(''); }}
        title='Add Club <span class="text-purple-400">Member</span>'
        subtitle="Manual member registration protocol"
        icon="person_add" accentColor="purple">
        <form action={async (fd: FormData) => { 
          setPending(true); 
          await createMember(fd); 
          setPending(false); 
          setOpen(false); 
          setAvatarPreview(''); 
        }}
          className="space-y-8">
          
          {clubId && <input type="hidden" name="clubId" value={clubId} />}
          
          <div className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-400/60 font-sans border-b border-white/5 pb-3">Member Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Email */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-purple-400/60 font-sans">Email Address *</label>
                <input name="email" type="email" required placeholder="member@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-purple-500/50 outline-none placeholder:text-white/20 font-sans" />
              </div>

              {/* First Name */}
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-purple-400/60 font-sans">First Name *</label>
                <input name="firstName" type="text" required placeholder="First name"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-purple-500/50 outline-none placeholder:text-white/20 font-sans" />
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-purple-400/60 font-sans">Last Name</label>
                <input name="lastName" type="text" placeholder="Last name"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-purple-500/50 outline-none placeholder:text-white/20 font-sans" />
              </div>

              {/* Role select */}
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-purple-400/60 font-sans">Role</label>
                <select name="role"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-purple-500/50 outline-none appearance-none uppercase tracking-widest cursor-pointer font-sans h-[54px]">
                  <option value="member" className="bg-slate-900">Member</option>
                  <option value="club_admin" className="bg-slate-900">Club Admin</option>
                  <option value="club_president" className="bg-slate-900">Club President</option>
                </select>
              </div>

              {/* Points / XP */}
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-purple-400/60 font-sans">Initial Points</label>
                <input name="points" type="number" defaultValue="0" placeholder="0" min="0"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-purple-500/50 outline-none placeholder:text-white/20 font-sans h-[54px]" />
              </div>

              {/* Avatar Image Upload */}
              <div className="space-y-3 md:col-span-2">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-purple-400/60 font-sans">Avatar Image</label>
                <div className="flex items-start gap-6">
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-24 h-24 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer hover:border-purple-500/40 hover:bg-purple-500/5 transition-all group overflow-hidden relative shrink-0"
                  >
                    {avatarPreview ? (
                      <img src={avatarPreview} className="w-full h-full object-cover" alt="Preview" />
                    ) : (
                      <span className="material-symbols-outlined text-3xl text-purple-500/30 group-hover:text-purple-500 transition-colors">add_photo_alternate</span>
                    )}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                      <span className="material-symbols-outlined text-white text-xl">upload</span>
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      name="avatarImage"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full bg-white/5 border border-white/10 border-dashed rounded-xl py-3 px-5 text-[10px] font-bold text-white/40 hover:text-white hover:border-purple-500/40 hover:bg-purple-500/5 transition-all uppercase tracking-widest font-sans flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">upload_file</span>
                      {avatarPreview ? 'Change Image' : 'Upload from Device'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-purple-400/60 font-sans">Biography (Bio)</label>
                <textarea name="bio" placeholder="Enter biography..." rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-purple-500/50 outline-none placeholder:text-white/20 font-sans resize-none" />
              </div>

            </div>
          </div>

          <button type="submit" disabled={pending}
            className="w-full bg-purple-600 text-white font-black uppercase tracking-[0.4em] text-[11px] py-5 rounded-xl hover:bg-purple-500 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-40 font-sans cursor-pointer">
            <span className="material-symbols-outlined text-lg">verified_user</span>
            {pending ? 'Registering...' : 'Register Member'}
          </button>
        </form>
      </SlidePanel>
    </>
  );
}
