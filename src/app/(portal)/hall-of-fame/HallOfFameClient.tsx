"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface LeaderEntry {
  id: string;
  name: string;
  points: number | null;
  avatarUrl: string | null;
  role: string | null;
}

interface Club {
  id: string;
  name: string;
  slug: string;
  logoUrl: string | null;
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
            { key: "individuals", label: "Top Members", icon: "person" },
            { key: "clubs", label: "Clubs", icon: "groups" },
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
                              {entry.avatarUrl ? (
                                <img src={entry.avatarUrl} alt={entry.name} className="w-full h-full object-cover" />
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
                              {entry.name || "Unknown"}
                            </div>
                            <div className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: tier.color }}>
                              {(entry.points ?? 0).toLocaleString()} pts
                            </div>
                            <div className="text-[9px] text-white/30 mt-1 uppercase tracking-[0.2em]">
                              {getRoleLabel(entry.role)}
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
                    Top Contributors
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
                          {entry.avatarUrl ? (
                            <img src={entry.avatarUrl} alt={entry.name} className="w-full h-full object-cover" />
                          ) : (
                            getInitials(entry.name || "?")
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="font-black text-sm text-white truncate">{entry.name || "Unknown"}</div>
                          <div className="text-[9px] text-white/30 uppercase tracking-[0.2em]">{getRoleLabel(entry.role)}</div>
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
                      <p className="text-white/20 text-sm uppercase tracking-[0.3em]">No champions yet. Be the first.</p>
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
                {clubs.length === 0 ? (
                  <div className="text-center py-24 space-y-4">
                    <span className="material-symbols-outlined text-6xl text-white/10">groups</span>
                    <p className="text-white/20 text-sm uppercase tracking-[0.3em]">No clubs registered yet.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {clubs.map((club, idx) => (
                      <motion.div
                        key={club.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        whileHover={{ y: -6 }}
                        className="relative p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-primary/30 backdrop-blur-xl transition-all group overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-all" />

                        <div className="relative z-10 space-y-4">
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
                            <div className="font-black text-white text-base leading-tight">{club.name}</div>
                            <div className="text-[9px] text-white/30 uppercase tracking-[0.3em] mt-1 font-bold">
                              {club.slug}
                            </div>
                          </div>

                          <div className="pt-2 border-t border-white/5">
                            <div className="text-[9px] text-primary/60 uppercase tracking-[0.3em] font-black">Active Club</div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
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
    </div>
  );
}
