'use client';

import { useTransition, useState } from 'react';
import { addBlastContacts, removeBlastContact, toggleBlastContact } from '@/app/actions/mutations';

type Contact = {
  id: string;
  email: string;
  name: string | null;
  label: string | null;
  isActive: boolean | null;
  createdAt: Date | null;
};

export default function BlastContactsManager({ contacts }: { contacts: Contact[] }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  function handleAdd(formData: FormData) {
    setError('');
    setSuccessMsg('');
    startTransition(async () => {
      try {
        const result = await addBlastContacts(formData);
        setSuccessMsg(`✓ Added ${result.added} contact${result.added !== 1 ? 's' : ''}${result.skipped > 0 ? ` · ${result.skipped} skipped (already exist)` : ''}`);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Failed to add contacts.');
      }
    });
  }

  function handleRemove(id: string) {
    startTransition(async () => {
      await removeBlastContact(id);
    });
  }

  function handleToggle(id: string, current: boolean) {
    startTransition(async () => {
      await toggleBlastContact(id, !current);
    });
  }

  const activeCount = contacts.filter(c => c.isActive).length;

  return (
    <section className="glass-panel overflow-hidden">
      {/* Header */}
      <div className="px-10 py-8 border-b border-white/5 bg-white/5 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white uppercase tracking-tight font-display">
            Blast <span className="text-primary">Contact List</span>
          </h2>
          <p className="text-[9px] text-text-muted font-bold uppercase tracking-[0.4em] opacity-40 mt-2 font-sans">
            Persistent external recipients for email blasts
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-[10px] font-bold text-primary bg-primary/5 px-6 py-2 rounded-full uppercase tracking-[0.3em] border border-primary/10 font-sans">
            {activeCount} Active · {contacts.length} Total
          </div>
        </div>
      </div>

      {/* Add contacts form */}
      <div className="p-10 border-b border-white/5">
        <form action={handleAdd} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bulk emails textarea */}
            <div className="md:col-span-2 space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary ml-4 font-sans">
                Bulk Add Emails *
              </label>
              <textarea
                name="bulkEmails"
                rows={4}
                required
                placeholder={`Paste emails here — one per line or comma separated:\n\npresident@clubname.org\nsecretary@clubname.org, treasurer@clubname.org\nguest@partnerorg.com`}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-sm font-medium text-white focus:border-primary/50 outline-none transition-all resize-none leading-relaxed placeholder:text-white/20 font-sans"
              />
            </div>

            {/* Label + submit */}
            <div className="space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary ml-4 font-sans">
                  Group Label <span className="text-white/20 normal-case">(optional)</span>
                </label>
                <input
                  name="label"
                  type="text"
                  placeholder="e.g. Partner Club, Sponsor…"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-medium text-white focus:border-primary/50 outline-none transition-all placeholder:text-white/20 font-sans"
                />
              </div>
              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-primary/10 border border-primary/30 text-primary font-bold uppercase tracking-[0.2em] text-[10px] px-6 py-4 rounded-xl hover:bg-primary hover:text-white hover:border-primary transition-all flex items-center justify-center gap-2 font-sans disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <><span className="material-symbols-outlined text-base animate-spin">progress_activity</span>Saving…</>
                ) : (
                  <><span className="material-symbols-outlined text-base">group_add</span>Save to List</>
                )}
              </button>
            </div>
          </div>

          {/* Status messages */}
          {successMsg && (
            <p className="text-[10px] font-bold text-green-400 bg-green-500/10 border border-green-500/20 rounded-lg px-5 py-3 font-sans">
              {successMsg}
            </p>
          )}
          {error && (
            <p className="text-[10px] font-bold text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-5 py-3 font-sans">
              ⚠ {error}
            </p>
          )}
        </form>
      </div>

      {/* Contacts table */}
      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-white/5">
              <th className="py-5 px-10 text-[10px] font-bold text-text-muted uppercase tracking-[0.3em] opacity-40 font-sans">Email</th>
              <th className="py-5 px-6 text-[10px] font-bold text-text-muted uppercase tracking-[0.3em] opacity-40 font-sans">Label</th>
              <th className="py-5 px-6 text-[10px] font-bold text-text-muted uppercase tracking-[0.3em] opacity-40 text-center font-sans">Status</th>
              <th className="py-5 px-6 text-[10px] font-bold text-text-muted uppercase tracking-[0.3em] opacity-40 font-sans">Added</th>
              <th className="py-5 px-6 text-[10px] font-bold text-text-muted uppercase tracking-[0.3em] opacity-40 text-right font-sans">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {contacts.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-24 text-center text-[10px] font-bold text-text-muted/20 uppercase tracking-[0.5em] font-sans">
                  No blast contacts yet — add some above
                </td>
              </tr>
            ) : (
              contacts.map(contact => (
                <tr key={contact.id} className={`hover:bg-white/5 transition-all group border-l-4 border-transparent hover:border-primary ${!contact.isActive ? 'opacity-40' : ''}`}>
                  <td className="py-5 px-10">
                    <p className="text-sm font-bold text-white font-sans">{contact.email}</p>
                  </td>
                  <td className="py-5 px-6">
                    {contact.label ? (
                      <span className="px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-[0.15em] bg-primary/5 text-primary border border-primary/10 font-sans">
                        {contact.label}
                      </span>
                    ) : (
                      <span className="text-[9px] text-white/20 font-sans">—</span>
                    )}
                  </td>
                  <td className="py-5 px-6 text-center">
                    <button
                      type="button"
                      onClick={() => handleToggle(contact.id, contact.isActive ?? true)}
                      disabled={isPending}
                      className={`px-4 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-[0.15em] border transition-all font-sans cursor-pointer
                        ${contact.isActive
                          ? 'bg-green-500/5 text-green-400 border-green-500/10 hover:bg-green-500/20'
                          : 'bg-white/5 text-white/20 border-white/10 hover:bg-white/10'}`}
                    >
                      {contact.isActive ? 'Active' : 'Paused'}
                    </button>
                  </td>
                  <td className="py-5 px-6">
                    <span className="text-[10px] text-white/30 font-sans">
                      {contact.createdAt ? new Date(contact.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
                    </span>
                  </td>
                  <td className="py-5 px-6 text-right">
                    <button
                      type="button"
                      onClick={() => handleRemove(contact.id)}
                      disabled={isPending}
                      className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-red-500/30 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all flex items-center justify-center ml-auto"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
