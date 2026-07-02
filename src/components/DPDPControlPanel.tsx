'use client';

import React, { useState } from 'react';
import { useClerk } from '@clerk/nextjs';
import { deleteUserAccountAction } from '@/app/actions/mutations';

interface DPDPControlPanelProps {
  userData: {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    role: string | null;
    clubId: string | null;
    bio: string | null;
    avatarUrl: string | null;
    points: number;
    created_at: any;
  };
  stats: {
    totalHours: number;
    eventsAttended: number;
    points: number;
  };
}

export default function DPDPControlPanel({ userData, stats }: DPDPControlPanelProps) {
  const { signOut } = useClerk();
  const [deleting, setDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDownloadData = () => {
    const dataStr = JSON.stringify({
      version: "DPDP-1.0",
      timestamp: new Date().toISOString(),
      principal: {
        id: userData.id,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: userData.role,
        clubId: userData.clubId,
        bio: userData.bio,
        avatarUrl: userData.avatarUrl,
        meritPoints: userData.points,
        registeredAt: userData.created_at
      },
      impactStats: {
        synchronizedHours: stats.totalHours,
        eventsAttended: stats.eventsAttended,
        points: stats.points
      }
    }, null, 2);

    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `rotaract_dpdp_export_${userData.id}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleErasureRequest = async () => {
    setDeleting(true);
    try {
      const confirmed = await deleteUserAccountAction();
      if (confirmed) {
        alert("DPDP Erasure Success: All personal data has been erased from District 3192 systems. Signing out...");
        await signOut();
        window.location.href = '/';
      }
    } catch (err) {
      console.error(err);
      alert("Request failed. Please contact the Data Protection Officer directly.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <section className="bg-surface-container-low/70 backdrop-blur-3xl rounded-[3.5rem] p-12 lg:p-16 border border-outline-variant/30 shadow-ambient relative overflow-hidden space-y-8">
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-[100px] -z-10"></div>
      
      <div className="space-y-4">
        <span className="inline-block px-4 py-1.5 rounded-full bg-red-500/5 text-red-400 text-[10px] font-black tracking-[0.4em] uppercase border border-red-500/10">DPDP Data Governance</span>
        <h3 className="text-4xl font-black font-display uppercase tracking-tighter text-on-surface italic leading-none">
          Data Principal <span className="text-primary not-italic">Control.</span>
        </h3>
        <p className="text-on-surface-variant leading-relaxed opacity-70">
          Under India's <strong>Digital Personal Data Protection (DPDP) Act, 2023</strong>, you retain full control over your digitized identity. Manage your rights to correction, portability, and erasure below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        {/* Data Portability */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-primary">
              <span className="material-symbols-outlined">download_for_offline</span>
              <h4 className="text-sm font-bold uppercase tracking-wider">1. Right to Portability</h4>
            </div>
            <p className="text-xs text-on-surface-variant opacity-60">
              Download a complete, machine-readable JSON archive of all your personal records, contact credentials, and verified district impact metrics.
            </p>
          </div>
          <button
            onClick={handleDownloadData}
            className="w-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-xl py-3 px-5 text-xs font-black uppercase tracking-widest transition-all cursor-pointer"
          >
            Export My Data (JSON)
          </button>
        </div>

        {/* Consent Withdrawal */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-red-400">
              <span className="material-symbols-outlined">delete_forever</span>
              <h4 className="text-sm font-bold uppercase tracking-wider text-red-400">2. Right to Erasure</h4>
            </div>
            <p className="text-xs text-on-surface-variant opacity-60">
              Withdraw your consent for processing and permanently erase all your records, logs, and activity metrics from the district servers.
            </p>
          </div>
          
          {showConfirm ? (
            <div className="space-y-3">
              <p className="text-[10px] text-red-400 font-bold uppercase tracking-wider text-center">Are you absolutely sure? This cannot be undone.</p>
              <div className="flex gap-3">
                <button
                  disabled={deleting}
                  onClick={handleErasureRequest}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-xl py-2 px-3 text-[10px] font-black uppercase tracking-wider transition-all disabled:opacity-50"
                >
                  {deleting ? 'Erasing...' : 'Yes, Erase'}
                </button>
                <button
                  disabled={deleting}
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 bg-white/5 hover:bg-white/10 text-white rounded-xl py-2 px-3 text-[10px] font-black uppercase tracking-wider transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowConfirm(true)}
              className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl py-3 px-5 text-xs font-black uppercase tracking-widest transition-all cursor-pointer"
            >
              Withdraw Consent & Erase Account
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
