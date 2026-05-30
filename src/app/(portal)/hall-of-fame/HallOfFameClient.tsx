"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface LeaderEntry {
  id: string;
  name: string;
  slug: string;
  logoUrl: string | null;
  points: number | null;
  city?: string | null;
  zone?: string | null;
}

interface ProjectStat {
  id: string;
  title: string;
  slug: string;
  score: number;
  aiAnalysis: string | null;
}

interface Club {
  id: string;
  name: string;
  slug: string;
  logoUrl: string | null;
  city?: string | null;
  zone?: string | null;
  totalProjects: number;
  totalAiPoints: number;
  averageAiScore: number;
  projects: ProjectStat[];
}


interface PastLeader {
  id: string;
  name: string;
  role: string;
  year: string;
  avatarUrl: string | null;
  themeName: string | null;
  citation: string | null;
}

interface Stats {
  totalClubs: number;
  totalMembers: number;
  totalEvents: number;
  totalAnnouncements: number;
}

const TIER_CONFIG = [
  { label: "GOLD", threshold: 0, color: "#FFD700", glow: "rgba(255,215,0,0.4)", icon: "emoji_events", rank: 1 },
  { label: "SILVER", threshold: 0, color: "#C0C0C0", glow: "rgba(192,192,192,0.3)", icon: "military_tech", rank: 2 },
  { label: "BRONZE", threshold: 0, color: "#CD7F32", glow: "rgba(205,127,50,0.3)", icon: "workspace_premium", rank: 3 },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "?";
}

function getRoleLabel(role: string | null) {
  if (!role) return "Member";
  const map: Record<string, string> = {
    district_admin: "District Admin",
    club_admin: "Club Leader",
    member: "Member",
  };
  return map[role] ?? role;
}

function MarkdownViewer({ content }: { content: string }) {
  const lines = content.split('\n');
  return (
    <div className="space-y-3 text-sm text-white/70 leading-relaxed font-sans">
      {lines.map((line, idx) => {
        if (line.startsWith('### ')) {
          return <h3 key={idx} className="text-sm font-black text-primary mt-4 mb-2 uppercase tracking-wider">{line.replace('### ', '')}</h3>;
        }
        if (line.startsWith('#### ')) {
          return <h4 key={idx} className="text-xs font-black text-white mt-3 mb-1 uppercase tracking-wider">{line.replace('#### ', '')}</h4>;
        }
        if (line.startsWith('* **') && line.includes(':**')) {
          const parts = line.split(':**');
          const label = parts[0].replace('* **', '') + ':';
          const val = parts[1].replace(/`/g, '');
          return (
            <div key={idx} className="flex gap-2 items-center text-xs">
              <span className="text-white/40 font-mono">•</span>
              <span className="text-white/50">{label}</span>
              <span className="text-yellow-400 font-bold">{val}</span>
            </div>
          );
        }
        if (line.startsWith('1. **') && line.includes('**')) {
          const parts = line.split('**');
          const bold = parts[1];
          const text = parts.slice(2).join('**');
          return (
            <div key={idx} className="pl-4 border-l-2 border-primary/20 py-0.5 text-xs text-white/80">
              <strong className="text-white font-semibold">{bold}</strong>{text}
            </div>
          );
        }
        if (line.startsWith('> **') || line.startsWith('> ')) {
          return (
            <blockquote key={idx} className="p-4 rounded-xl border border-[#FFD700]/20 bg-[#FFD700]/5 text-xs italic text-[#FFD700]/80 my-4">
              {line.replace(/^>\s*(\*\*)?/, '').replace(/(\*\*)?\s*$/, '')}
            </blockquote>
          );
        }
        if (line.trim() === '---') {
          return <hr key={idx} className="border-white/5 my-4" />;
        }
        if (line.trim() === '') return null;
        return <p key={idx} className="text-xs text-white/60">{line}</p>;
      })}
    </div>
  );
}


export default function HallOfFameClient({
  leaderboard,
  clubs,
  stats,
  pastLeaders,
}: {
  leaderboard: LeaderEntry[];
  clubs: Club[];
  stats: Stats;
  pastLeaders: PastLeader[];
}) {
  const [activeTab, setActiveTab] = useState<"individuals" | "clubs" | "honor">("individuals");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectStat | null>(null);


  const top3 = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);

  const podiumOrder = top3.length >= 3
    ? [top3[1], top3[0], top3[2]]   // Silver, Gold, Bronze visual order
    : top3;

  const podiumHeights = ["h-36", "h-52", "h-28"];
  const podiumRanks = [2, 1, 3];

  return (
    <div className="relative min-h-screen bg-transparent text-white">
      {/* ─── Page Header ─── */}
      <section className="relative z-10 pt-48 pb-24 px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8 max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-[#FFD700]/20 bg-[#FFD700]/5">
            <span className="material-symbols-outlined text-[#FFD700] text-base">emoji_events</span>
            <span className="text-[9px] font-black text-white/60 uppercase tracking-[0.5em]">District 3192</span>
          </div>

          <h1 className="text-6xl md:text-[8rem] font-black tracking-tighter font-display uppercase italic leading-none">
            Hall of{" "}
            <span
              className="not-italic"
              style={{ color: "#FFD700", textShadow: "0 0 60px rgba(255,215,0,0.4)" }}
            >
              Fame
            </span>
          </h1>

          <p className="text-white/30 text-sm font-medium max-w-lg mx-auto leading-relaxed">
            Recognizing the highest-impact contributors shaping the future of our district.
          </p>
        </motion.div>
      </section>

      {/* ─── Stats Bar ─── */}
      <section className="relative z-10 px-8 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: "Champions", val: leaderboard.length.toString(), icon: "emoji_events" },
            { label: "Clubs", val: stats.totalClubs.toString(), icon: "groups" },
            { label: "Members", val: stats.totalMembers.toString(), icon: "person" },
            { label: "Projects", val: stats.totalEvents.toString(), icon: "handshake" },
          ].map((s, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-3 py-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/5 hover:border-[#FFD700]/20 transition-all group"
            >
              <span className="material-symbols-outlined text-[#FFD700]/40 group-hover:text-[#FFD700] transition-colors">{s.icon}</span>
              <div className="text-3xl font-black text-white">{s.val}</div>
              <div className="text-[9px] font-bold text-white/30 uppercase tracking-[0.4em]">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ─── Tab Toggle ─── */}
      <section className="relative z-10 px-8 pb-16 flex justify-center">
        <div className="flex items-center gap-1 p-1 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl">
          {[
            { key: "individuals", label: "Top Clubs", icon: "groups" },
            { key: "clubs", label: "AI Project Rankings", icon: "analytics" },
            { key: "honor", label: "Hall of Honor", icon: "military_tech" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as "individuals" | "clubs" | "honor")}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] transition-all ${
                activeTab === tab.key
                  ? "bg-[#FFD700] text-[#020617]"
                  : "text-white/30 hover:text-white"
              }`}
            >
              <span className="material-symbols-outlined text-base">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      <AnimatePresence mode="wait">
        {activeTab === "individuals" && (
          <motion.div
            key="individuals"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {/* ─── Podium ─── */}
            {top3.length > 0 && (
              <section className="relative z-10 px-8 pb-24">
                <div className="max-w-4xl mx-auto">
                  <div className="flex items-end justify-center gap-6 mb-0">
                    {(top3.length >= 3 ? podiumOrder : top3).map((entry, idx) => {
                      const rank = top3.length >= 3 ? podiumRanks[idx] : idx + 1;
                      const tier = TIER_CONFIG.find((t) => t.rank === rank) ?? TIER_CONFIG[2];
                      const height = podiumHeights[idx];

                      return (
                        <motion.div
                          key={entry.id}
                          initial={{ opacity: 0, y: 40 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.15 }}
                          className="flex flex-col items-center gap-4"
                        >
                          {/* Avatar */}
                          <div className="relative">
                            <div
                              className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 overflow-hidden flex items-center justify-center text-2xl font-black"
                              style={{
                                borderColor: tier.color,
                                boxShadow: `0 0 30px ${tier.glow}`,
                                background: `radial-gradient(circle at center, ${tier.glow}, #020617)`,
                              }}
                            >
                              {entry.logoUrl ? (
                                <img src={entry.logoUrl} alt={entry.name} className="w-full h-full object-cover" />
                              ) : (
                                <span style={{ color: tier.color }}>{getInitials(entry.name || "?")}</span>
                              )}
                            </div>
                            {rank === 1 && (
                              <span
                                className="material-symbols-outlined absolute -top-3 -right-3 text-3xl"
                                style={{ color: "#FFD700", filter: "drop-shadow(0 0 8px #FFD700)" }}
                              >
                                emoji_events
                              </span>
                            )}
                          </div>

                          {/* Name & Points */}
                          <div className="text-center">
                            <div className="font-black text-sm md:text-base text-white truncate max-w-[120px]">
                              {entry.name || "Unknown Club"}
                            </div>
                            <div className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: tier.color }}>
                              {(entry.points ?? 0).toLocaleString()} pts
                            </div>
                            <div className="text-[9px] text-white/30 mt-1 uppercase tracking-[0.2em]">
                              {entry.city || "District 3192"} {entry.zone ? `• Zone ${entry.zone}` : ''}
                            </div>
                          </div>

                          {/* Podium Block */}
                          <div
                            className={`w-28 md:w-36 ${height} rounded-t-2xl flex items-start justify-center pt-3 relative overflow-hidden`}
                            style={{
                              background: `linear-gradient(to bottom, ${tier.glow}, rgba(255,255,255,0.03))`,
                              border: `1px solid ${tier.color}30`,
                            }}
                          >
                            <span
                              className="text-4xl font-black font-display"
                              style={{ color: `${tier.color}60` }}
                            >
                              {rank}
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                  {/* Podium Base */}
                  <div className="h-2 bg-gradient-to-r from-transparent via-[#FFD700]/20 to-transparent rounded-full" />
                </div>
              </section>
            )}

            {/* ─── Rest of Leaderboard ─── */}
            {rest.length > 0 && (
              <section className="relative z-10 px-8 pb-32">
                <div className="max-w-4xl mx-auto space-y-3">
                  <h2 className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] mb-8 text-center">
                    Ranked Clubs
                  </h2>
                  {rest.map((entry, idx) => {
                    const rank = idx + 4;
                    return (
                      <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        onMouseEnter={() => setHoveredId(entry.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        className="flex items-center gap-6 p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 backdrop-blur-xl transition-all group cursor-default"
                      >
                        {/* Rank */}
                        <div className="w-8 text-center font-black text-white/20 group-hover:text-white/60 text-sm transition-colors">
                          {rank}
                        </div>

                        {/* Avatar */}
                        <div className="w-11 h-11 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-sm font-black text-white/60 overflow-hidden flex-shrink-0">
                          {entry.logoUrl ? (
                            <img src={entry.logoUrl} alt={entry.name} className="w-full h-full object-cover" />
                          ) : (
                            getInitials(entry.name || "?")
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="font-black text-sm text-white truncate">{entry.name || "Unknown Club"}</div>
                          <div className="text-[9px] text-white/30 uppercase tracking-[0.2em]">{entry.city || "District 3192"} {entry.zone ? `• Zone ${entry.zone}` : ''}</div>
                        </div>

                        {/* Points */}
                        <div className="text-right flex-shrink-0">
                          <div className="font-black text-primary text-lg">{(entry.points ?? 0).toLocaleString()}</div>
                          <div className="text-[8px] text-white/20 uppercase tracking-[0.3em]">points</div>
                        </div>
                      </motion.div>
                    );
                  })}

                  {leaderboard.length === 0 && (
                    <div className="text-center py-24 space-y-4">
                      <span className="material-symbols-outlined text-6xl text-white/10">emoji_events</span>
                      <p className="text-white/20 text-sm uppercase tracking-[0.3em]">No clubs ranked yet.</p>
                    </div>
                  )}
                </div>
              </section>
            )}
          </motion.div>
        )}

        {activeTab === "clubs" && (
          <motion.div
            key="clubs"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <section className="relative z-10 px-8 pb-32">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-wider mb-3">
                    <span className="material-symbols-outlined text-xs">auto_awesome</span>
                    District Club Leaderboard
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black font-display uppercase tracking-tight">AI Project Impact Rankings</h2>
                  <p className="text-white/40 text-xs mt-3 max-w-md mx-auto leading-relaxed">
                    Clubs are ranked based on the aggregate uniqueness and social impact scores of their project portfolios, evaluated by the District AI engine.
                  </p>
                </div>

                {clubs.length === 0 ? (
                  <div className="text-center py-24 space-y-4">
                    <span className="material-symbols-outlined text-6xl text-white/10">groups</span>
                    <p className="text-white/20 text-sm uppercase tracking-[0.3em]">No clubs registered yet.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {clubs.map((club, idx) => {
                      const rank = idx + 1;
                      const rankLabel = rank === 1 ? "🥇 1st" : rank === 2 ? "🥈 2nd" : rank === 3 ? "🥉 3rd" : `#${rank}`;
                      const borderGlow = rank === 1 ? 'hover:border-[#FFD700]/30' : rank === 2 ? 'hover:border-[#C0C0C0]/30' : rank === 3 ? 'hover:border-[#CD7F32]/30' : 'hover:border-primary/30';
                      const badgeBg = rank === 1 ? 'bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/20' : rank === 2 ? 'bg-[#C0C0C0]/10 text-white/80 border border-white/10' : rank === 3 ? 'bg-[#CD7F32]/10 text-[#CD7F32] border border-[#CD7F32]/20' : 'bg-white/5 text-white/40 border border-white/5';

                      return (
                        <motion.div
                          key={club.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          whileHover={{ y: -6 }}
                          className={`relative p-8 rounded-3xl bg-white/5 border border-white/5 ${borderGlow} backdrop-blur-xl transition-all group overflow-hidden flex flex-col justify-between`}
                        >
                          {/* Rank Ribbon */}
                          <div className="absolute top-4 right-4">
                            <span className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${badgeBg} font-mono shadow-sm`}>
                              {rankLabel}
                            </span>
                          </div>

                          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-all" />

                          <div className="relative z-10 space-y-6 flex-grow flex flex-col justify-between">
                            <div className="space-y-4">
                              {/* Club Logo / Initials */}
                              <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center overflow-hidden group-hover:border-primary/30 transition-all">
                                {club.logoUrl ? (
                                  <img src={club.logoUrl} alt={club.name} className="w-full h-full object-cover" />
                                ) : (
                                  <span className="material-symbols-outlined text-white/30 group-hover:text-primary transition-colors text-3xl">
                                    groups
                                  </span>
                                )}
                              </div>

                              <div>
                                <div className="font-black text-white text-base leading-tight group-hover:text-primary transition-colors">{club.name}</div>
                                <div className="text-[9px] text-white/30 uppercase tracking-[0.2em] mt-1 font-bold">
                                  {club.city || 'District 3192'} • Zone {club.zone || 'A'}
                                </div>
                              </div>
                            </div>

                            {/* Scoring Stats Block */}
                            <div className="py-4 border-y border-white/5 grid grid-cols-2 gap-4">
                              <div>
                                <div className="text-[8px] text-white/30 uppercase tracking-[0.2em] font-bold">Aggregate Score</div>
                                <div className="text-2xl font-black text-primary mt-1 font-display">
                                  {club.totalAiPoints.toLocaleString()} <span className="text-[10px] font-sans font-medium text-white/40">pts</span>
                                </div>
                              </div>
                              <div>
                                <div className="text-[8px] text-white/30 uppercase tracking-[0.2em] font-bold">Projects Audited</div>
                                <div className="text-xl font-bold text-white mt-1.5 font-mono">
                                  {club.totalProjects} <span className="text-[10px] font-sans font-medium text-white/40">items</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between gap-3 pt-2">
                              <div className="text-[9px] text-white/40 font-medium">
                                Avg Score: <span className="text-white/80 font-bold font-mono">{club.averageAiScore || 0}/100</span>
                              </div>
                              <button
                                onClick={() => setSelectedClub(club)}
                                className="text-[10px] font-black uppercase tracking-wider text-primary hover:text-white transition-colors bg-primary/10 hover:bg-primary px-3.5 py-2 rounded-full flex items-center gap-1 cursor-pointer"
                              >
                                <span className="material-symbols-outlined text-xs">analytics</span>
                                View Audits
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>
            </section>
          </motion.div>
        )}
        {activeTab === "honor" && (
          <motion.div
            key="honor"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <section className="relative z-10 px-8 pb-32">
              <div className="max-w-4xl mx-auto relative">
                {/* Timeline vertical bar */}
                {pastLeaders.length > 0 && (
                  <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#FFD700]/80 via-[#FFD700]/20 to-transparent -translate-x-1/2" />
                )}

                <div className="space-y-16">
                  {pastLeaders.map((leader, idx) => {
                    const isEven = idx % 2 === 0;
                    return (
                      <motion.div
                        key={leader.id}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: idx * 0.1 }}
                        className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-0 relative ${
                          isEven ? "md:flex-row-reverse" : ""
                        }`}
                      >
                        {/* Timeline Node Point */}
                        <div className="absolute left-8 md:left-1/2 w-8 h-8 rounded-full bg-[#020617] border-2 border-[#FFD700] flex items-center justify-center -translate-x-1/2 z-10 shadow-[0_0_15px_rgba(255,215,0,0.3)]">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#FFD700]" />
                        </div>

                        {/* Leader Year Badge */}
                        <div className="w-full md:w-[45%] flex justify-start md:justify-end pl-16 md:pl-0 md:pr-12 md:text-right">
                          <div className={`${isEven ? "md:text-left md:pl-12 md:pr-0" : ""} space-y-2`}>
                            <span className="text-3xl font-black font-display text-white tracking-wider block bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
                              {leader.year}
                            </span>
                            {leader.themeName && (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#FFD700]/20 bg-[#FFD700]/5 text-[#FFD700] text-[9px] font-black uppercase tracking-wider font-sans">
                                <span className="material-symbols-outlined text-[10px]">local_activity</span>
                                {leader.themeName}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Card Container */}
                        <div className="w-full md:w-[45%] pl-16 md:pl-0">
                          <div className="glass-panel p-8 relative overflow-hidden group hover:border-[#FFD700]/30 transition-all duration-300">
                            {/* Card Glow */}
                            <div className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br from-[#FFD700]/10 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="flex gap-6 items-start">
                              {/* Leader Photo */}
                              <div className="w-20 h-20 rounded-2xl overflow-hidden border border-white/10 bg-white/5 relative shrink-0">
                                <img
                                  src={leader.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(leader.name)}&background=003F8A&color=fff`}
                                  alt={leader.name}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                              </div>
                              {/* Name, Role & Citation */}
                              <div className="space-y-3 min-w-0 flex-1">
                                <div>
                                  <h3 className="text-xl font-bold text-white uppercase tracking-tight font-display truncate leading-tight group-hover:text-[#FFD700] transition-colors">
                                    {leader.name}
                                  </h3>
                                  <p className="text-[9px] text-[#FFD700] uppercase tracking-widest font-black mt-1 font-sans">
                                    {leader.role}
                                  </p>
                                </div>
                                {leader.citation && (
                                  <p className="text-xs text-white/50 leading-relaxed font-sans mt-2">
                                    {leader.citation}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}

                  {pastLeaders.length === 0 && (
                    <div className="text-center py-24 space-y-4">
                      <span className="material-symbols-outlined text-6xl text-white/10">military_tech</span>
                      <p className="text-white/20 text-sm uppercase tracking-[0.3em] font-sans">
                        No past district leaders registered in the Hall of Honor yet.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Club AI Audit Modal ─── */}
      <AnimatePresence>
        {selectedClub && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-hidden rounded-3xl border border-white/10 bg-slate-900/90 p-8 shadow-2xl backdrop-blur-2xl flex flex-col justify-between"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedClub(null)}
                className="absolute top-6 right-6 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors cursor-pointer text-white/50 hover:text-white"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>

              <div className="space-y-6 overflow-y-auto flex-grow pr-2 my-2">
                {/* Header */}
                <div className="flex gap-5 items-center pb-6 border-b border-white/5">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                    {selectedClub.logoUrl ? (
                      <img src={selectedClub.logoUrl} alt={selectedClub.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="material-symbols-outlined text-white/30 text-3xl">groups</span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white uppercase tracking-tight">{selectedClub.name}</h3>
                    <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] mt-1 font-semibold">
                      {selectedClub.city || 'District 3192'} • Zone {selectedClub.zone || 'A'}
                    </p>
                  </div>
                </div>

                {/* Score Summary */}
                <div className="grid grid-cols-3 gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="text-center">
                    <div className="text-[8px] text-white/40 uppercase tracking-wider font-bold">Total AI Points</div>
                    <div className="text-2xl font-black text-primary mt-1">{selectedClub.totalAiPoints}</div>
                  </div>
                  <div className="text-center border-x border-white/5">
                    <div className="text-[8px] text-white/40 uppercase tracking-wider font-bold">Projects Audited</div>
                    <div className="text-2xl font-black text-white mt-1">{selectedClub.totalProjects}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[8px] text-white/40 uppercase tracking-wider font-bold">Average Grade</div>
                    <div className="text-2xl font-black text-green-400 mt-1">{selectedClub.averageAiScore}/100</div>
                  </div>
                </div>

                {/* Projects List */}
                <div className="space-y-4 pt-2">
                  <h4 className="text-xs font-black uppercase tracking-widest text-white/40">Portfolio Evaluation</h4>
                  {selectedClub.projects.length === 0 ? (
                    <div className="text-center py-12 border border-dashed border-white/5 rounded-2xl">
                      <span className="material-symbols-outlined text-4xl text-white/10 mb-2">auto_awesome</span>
                      <p className="text-white/20 text-xs uppercase tracking-wider font-mono">No AI projects logged yet</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {selectedClub.projects.map((project) => (
                        <div
                          key={project.id}
                          className="p-4 rounded-xl border border-white/5 bg-white/5 flex items-center justify-between gap-4 hover:border-primary/20 transition-all group"
                        >
                          <div className="min-w-0 flex-1">
                            <h5 className="font-bold text-white text-sm truncate leading-tight group-hover:text-primary transition-colors">
                              {project.title}
                            </h5>
                            <p className="text-[9px] text-white/30 font-mono mt-1 uppercase tracking-wider">
                              ID: {project.slug}
                            </p>
                          </div>
                          <div className="flex items-center gap-4 shrink-0">
                            <div className="text-right">
                              <span className="text-xs font-black text-primary font-mono bg-primary/10 px-2.5 py-1 rounded-full">
                                {project.score}/100
                              </span>
                            </div>
                            <button
                              onClick={() => setSelectedProject(project)}
                              className="text-[10px] font-black uppercase tracking-wider text-white hover:text-primary bg-white/10 hover:bg-primary/20 px-3 py-1.5 rounded-lg cursor-pointer transition-all"
                            >
                              Audit Report
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 flex justify-end">
                <button
                  onClick={() => setSelectedClub(null)}
                  className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Project AI Audit Detail Drawer/Submodal ─── */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl max-h-[80vh] overflow-hidden rounded-3xl border border-white/10 bg-slate-900/95 p-8 shadow-2xl backdrop-blur-2xl flex flex-col justify-between"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors cursor-pointer text-white/50 hover:text-white"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>

              <div className="space-y-6 overflow-y-auto flex-grow pr-2 my-2">
                {/* Header */}
                <div className="pb-6 border-b border-white/5 space-y-1">
                  <span className="text-[9px] font-black text-primary uppercase tracking-[0.3em]">AI Project Evaluation Audit</span>
                  <h3 className="text-lg font-bold text-white tracking-tight leading-tight">{selectedProject.title}</h3>
                </div>

                {/* Audit Body */}
                <div className="py-2">
                  {selectedProject.aiAnalysis ? (
                    <MarkdownViewer content={selectedProject.aiAnalysis} />
                  ) : (
                    <div className="text-center py-12 space-y-3">
                      <span className="material-symbols-outlined text-4xl text-white/10">auto_awesome</span>
                      <p className="text-white/20 text-xs font-mono">No evaluation report available for this entry.</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 flex justify-end">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/80 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Go Back
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

