'use client';

import React from 'react';

export default function PrivacyPage() {
  const handleWithdrawalRequest = () => {
    alert("Request Received: In compliance with DPDP Act, 2023, you can request full erasure of your personal data or withdraw consent by emailing the Data Protection Officer at privacy@rotaract3192.org.");
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto space-y-16">
        <header className="space-y-6 text-center lg:text-left">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-[10px] font-black tracking-[0.4em] uppercase border border-primary/10">DPDP Compliance</span>
          <h1 className="text-5xl md:text-7xl font-black text-on-surface tracking-tighter font-display uppercase leading-none italic">
            Privacy <span className="text-primary not-italic">Protocol.</span>
          </h1>
          <p className="text-on-surface-variant text-sm font-medium opacity-60 italic flex items-center justify-center lg:justify-start gap-3">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(var(--color-primary-rgb),0.5)]"></span>
            Compliant with Digital Personal Data Protection (DPDP) Act, 2023
          </p>
        </header>

        <section className="bg-surface-container-low/70 backdrop-blur-3xl rounded-[3.5rem] p-12 lg:p-16 border border-outline-variant/30 shadow-ambient space-y-10">
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-on-surface uppercase tracking-tight font-display italic">1.0 Notice of Data <span className="text-primary not-italic">Processing.</span></h2>
            <p className="text-on-surface-variant leading-relaxed">
              In accordance with Section 5 of the DPDP Act, 2023, this notice explains that Rotaract District 3192 processes personal data (names, email addresses, phone numbers, and club affiliations) solely for purposes of administrative coordination, member directory listings, event registrations, service hours validation, and district communications.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-black text-on-surface uppercase tracking-tight font-display italic">2.0 Unambiguous & Specific <span className="text-primary not-italic">Consent.</span></h2>
            <p className="text-on-surface-variant leading-relaxed">
              Your consent to collect and process data is free, specific, informed, unconditional, and unambiguous. By registering an account, submitting logs, or accessing the portal, you consent to data processing for administrative and engagement tasks. You may withdraw consent at any time.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-black text-on-surface uppercase tracking-tight font-display italic">3.0 Rights of the Data <span className="text-primary not-italic">Principal.</span></h2>
            <p className="text-on-surface-variant leading-relaxed">
              Under the DPDP Act, you possess the following statutory rights as a Data Principal:
            </p>
            <ul className="list-disc list-inside text-on-surface-variant space-y-2 ml-4">
              <li><strong>Right to Access & Summary:</strong> Access details of all personal data we process.</li>
              <li><strong>Right to Correction & Erasure:</strong> Request correction of inaccurate records or complete deletion (erasure) of all your personal records.</li>
              <li><strong>Right to Grievance Redressal:</strong> Register grievances or complaints with the Data Protection Officer regarding data processing.</li>
              <li><strong>Right to Withdraw Consent:</strong> Revoke permission to process your data easily, causing subsequent deletion of your portal records.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-black text-on-surface uppercase tracking-tight font-display italic">4.0 Consent Withdrawal & Data <span className="text-primary not-italic">Erasure.</span></h2>
            <p className="text-on-surface-variant leading-relaxed">
              If you decide to withdraw your consent, you can submit an erasure request directly by emailing privacy@rotaract3192.org or initiating a request using the button below. Once processed, all personal data and records will be permanently erased.
            </p>
            <button
              onClick={handleWithdrawalRequest}
              className="mt-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl px-6 py-3 text-xs font-black uppercase tracking-widest transition-all"
            >
              Request Data Erasure / Withdraw Consent
            </button>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-black text-on-surface uppercase tracking-tight font-display italic">5.0 Grievance Redressal & <span className="text-primary not-italic">Contacts.</span></h2>
            <p className="text-on-surface-variant leading-relaxed">
              For any grievances, queries, or to exercise your rights under the DPDP Act, please reach out to our designated Data Protection Officer:
            </p>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-2">
              <p className="text-sm font-bold text-white">Data Protection Officer</p>
              <p className="text-xs text-white/60">Rotaract District 3192 Secretariat</p>
              <p className="text-xs text-white/60">Email: <a href="mailto:privacy@rotaract3192.org" className="text-primary font-bold">privacy@rotaract3192.org</a></p>
              <p className="text-xs text-white/60">Grievance Rep: <span className="text-primary font-bold">thejaswinps@gmail.com</span></p>
            </div>
          </div>

          <div className="pt-10 border-t border-outline-variant/30">
            <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.3em] opacity-40 italic">Last Updated: July 2026 | Rotaract District 3192 Secretariat</p>
          </div>
        </section>
      </div>
    </div>
  );
}
