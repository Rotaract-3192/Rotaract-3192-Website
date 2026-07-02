'use client';

import React from 'react';

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto space-y-16">
        <header className="space-y-6 text-center lg:text-left">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-[10px] font-black tracking-[0.4em] uppercase border border-primary/10">Usage Agreement</span>
          <h1 className="text-5xl md:text-7xl font-black text-on-surface tracking-tighter font-display uppercase leading-none italic">
            Terms of <span className="text-primary not-italic">Service.</span>
          </h1>
          <p className="text-on-surface-variant text-sm font-medium opacity-60 italic flex items-center justify-center lg:justify-start gap-3">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(var(--color-primary-rgb),0.5)]"></span>
            Operational Guidelines & Member Conduct v2.0
          </p>
        </header>

        <section className="bg-surface-container-low/70 backdrop-blur-3xl rounded-[3.5rem] p-12 lg:p-16 border border-outline-variant/30 shadow-ambient space-y-10">
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-on-surface uppercase tracking-tight font-display italic">1.0 Platform <span className="text-primary not-italic">Authorization.</span></h2>
            <p className="text-on-surface-variant leading-relaxed">
              Access to the Rotaract District 3192 Member Portal is granted strictly to active, certified members of chartered Rotaract clubs within District 3192. Accounts must be registered using verified details. Access will be revoked immediately if a member is reported as inactive or suspended by their respective club president.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-black text-on-surface uppercase tracking-tight font-display italic">2.0 Credentials & <span className="text-primary not-italic">Account Security.</span></h2>
            <p className="text-on-surface-variant leading-relaxed">
              You are entirely responsible for maintaining the confidentiality and security of your Clerk login credentials. Any activity occurring under your account (including submitting service hours, posting feed updates, editing club details, or creating events) is deemed to be authorized by you. Sharing account access with third parties is strictly prohibited.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-black text-on-surface uppercase tracking-tight font-display italic">3.0 Rotaract Code of Conduct & <span className="text-primary not-italic">Four-Way Test.</span></h2>
            <p className="text-on-surface-variant leading-relaxed">
              All interactions on this platform must comply with the Rotaract Code of Conduct and the Rotary Four-Way Test:
            </p>
            <ul className="list-decimal list-inside text-on-surface-variant space-y-2 ml-4">
              <li>Is it the <strong>TRUTH</strong>?</li>
              <li>Is it <strong>FAIR</strong> to all concerned?</li>
              <li>Will it build <strong>GOODWILL</strong> and <strong>BETTER FRIENDSHIPS</strong>?</li>
              <li>Will it be <strong>BENEFICIAL</strong> to all concerned?</li>
            </ul>
            <p className="text-on-surface-variant leading-relaxed mt-2">
              Any form of harassment, hate speech, posting of inappropriate media, data scraping, or malicious manipulation of system inputs is ground for immediate permanent ban and reporting to the district disciplinary board.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-black text-on-surface uppercase tracking-tight font-display italic">4.0 Data Ownership & <span className="text-primary not-italic">Intellectual Property.</span></h2>
            <p className="text-on-surface-variant leading-relaxed">
              All training course modules, newsletters, PDF documents, meeting minutes, and logos uploaded by the district or club administrators are protected by intellectual property laws. These materials are intended strictly for internal club usage and leadership training. Downloading, reproducing, or sharing these assets for commercial or external marketing purposes without written consent from the District Secretariat is prohibited.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-black text-on-surface uppercase tracking-tight font-display italic">5.0 Impact Reporting & <span className="text-primary not-italic">Leaderboard Ethics.</span></h2>
            <p className="text-on-surface-variant leading-relaxed">
              Members and club presidents must report event attendance, points, and service hours truthfully. Club administrators must verify MOMs (Minutes of Meetings) and project details before submitting them for points. Inputting falsified or exaggerated metrics to climb the leaderboard will lead to the forfeiture of club points and suspension of portal privileges.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-black text-on-surface uppercase tracking-tight font-display italic">6.0 Data Protection & <span className="text-primary not-italic">DPDP Act Alignment.</span></h2>
            <p className="text-on-surface-variant leading-relaxed">
              Your usage of this platform is subject to our Privacy Policy, which is aligned with the Digital Personal Data Protection (DPDP) Act, 2023. You have the right to withdraw your consent to these terms at any time, which will result in the immediate termination of your portal access and deletion of your personal records.
            </p>
          </div>

          <div className="pt-10 border-t border-outline-variant/30">
            <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.3em] opacity-40 italic">Last Updated: July 2026 | Rotaract District 3192 Secretariat</p>
          </div>
        </section>
      </div>
    </div>
  );
}
