"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EventCard from "@/components/EventCard";
import SlidePanel from "@/components/SlidePanel";
import { format } from "date-fns";

interface Club {
  id: string;
  slug: string;
  name: string;
  charterDate: string | Date | null;
  description: string | null;
  logoUrl: string | null;
  city: string | null;
  zone: string | null;
  venue: string | null;
  meetingDayTime: string | null;
  presidentName: string | null;
  presidentPhone: string | null;
  presidentEmail: string | null;
  secretaryName: string | null;
  secretaryPhone: string | null;
  secretaryEmail: string | null;
}

interface EventOrProject {
  id: string;
  clubId: string | null;
  title: string;
  slug: string;
  description: string | null;
  eventDate: Date | string | null;
  location: string | null;
  imageUrl: string | null;
  isSignatureProject: boolean | null;
  status: string | null;
  category: string | null;
  entryType: string | null;
  yearDateLabel: string | null;
  fullContent: string | null;
  galleryImages: string | null;
  featuredLinks: string | null;
  rsvpLink: string | null;
  aiScore: number | null;
  aiAnalysis: string | null;
  createdAt: Date | string | null;
  updatedAt: Date | string | null;
}

interface FeedItem {
  id: string;
  title: string;
  content: string | null;
  mediaUrl: string | null;
  type: string | null;
  createdAt: string;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "?";
}

function parseJsonSafe<T>(jsonString: string | null | undefined, fallback: T): T {
  if (!jsonString) return fallback;
  try {
    return JSON.parse(jsonString) as T;
  } catch (e) {
    return fallback;
  }
}

// Compact helper to render evaluated AI reports in detail drawer
function MarkdownReport({ content }: { content: string }) {
  const lines = content.split("\n");
  return (
    <div className="space-y-4 text-sm text-white/70 leading-relaxed font-sans">
      {lines.map((line, idx) => {
        if (line.startsWith("### ")) {
          return (
            <h3 key={idx} className="text-sm font-black text-primary mt-6 mb-3 uppercase tracking-wider">
              {line.replace("### ", "")}
            </h3>
          );
        }
        if (line.startsWith("#### ")) {
          return (
            <h4 key={idx} className="text-xs font-black text-white mt-4 mb-2 uppercase tracking-wider">
              {line.replace("#### ", "")}
            </h4>
          );
        }
        if (line.startsWith("* **") && line.includes(":**")) {
          const parts = line.split(":**");
          const label = parts[0].replace("* **", "") + ":";
          const val = parts[1].replace(/`/g, "");
          return (
            <div key={idx} className="flex gap-2 items-center text-xs">
              <span className="text-white/40 font-mono">•</span>
              <span className="text-white/50">{label}</span>
              <span className="text-yellow-400 font-bold">{val}</span>
            </div>
          );
        }
        if (line.startsWith("1. **") && line.includes("**")) {
          const parts = line.split("**");
          const bold = parts[1];
          const text = parts.slice(2).join("**");
          return (
            <div key={idx} className="pl-4 border-l-2 border-primary/20 py-0.5 text-xs text-white/80">
              <strong className="text-white font-semibold">{bold}</strong>
              {text}
            </div>
          );
        }
        if (line.startsWith("> **") || line.startsWith("> ")) {
          return (
            <blockquote key={idx} className="p-4 rounded-xl border border-primary/20 bg-primary/5 text-xs italic text-primary/80 my-4">
              {line.replace(/^>\s*(\*\*)?/, "").replace(/(\*\*)?\s*$/, "")}
            </blockquote>
          );
        }
        if (line.trim() === "---") {
          return <hr key={idx} className="border-white/5 my-6" />;
        }
        if (line.trim() === "") return null;
        return <p key={idx} className="text-xs text-white/60">{line}</p>;
      })}
    </div>
  );
}

export default function ClubProfileClient({
  club,
  events,
  feeds,
}: {
  club: Club;
  events: EventOrProject[];
  feeds: FeedItem[];
}) {
  const [activeTab, setActiveTab] = useState<"showcase" | "operations" | "intel">("operations");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<EventOrProject | null>(null);

  // Group events into Completed Projects (Showcase) vs Upcoming Events (Operations)
  const { showcaseProjects, upcomingEvents } = useMemo(() => {
    const list = events || [];
    return {
      showcaseProjects: list.filter(
        (e) => e.entryType === "Project" || e.status === "completed"
      ),
      upcomingEvents: list.filter(
        (e) => e.status === "upcoming" && e.entryType !== "Project"
      ),
    };
  }, [events]);

  // Categories extracted from projects
  const projectCategories = useMemo(() => {
    const cats = new Set(showcaseProjects.map((p) => p.category).filter((c): c is string => typeof c === 'string'));
    return ["All", ...Array.from(cats)];
  }, [showcaseProjects]);

  // Filtered completed projects
  const filteredProjects = useMemo(() => {
    return showcaseProjects.filter((proj) => {
      const matchesSearch =
        proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (proj.description || "").toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat =
        categoryFilter === "All" || proj.category === categoryFilter;
      return matchesSearch && matchesCat;
    });
  }, [showcaseProjects, searchQuery, categoryFilter]);

  // Total points generated by this club
  const clubScoreStats = useMemo(() => {
    const count = showcaseProjects.length;
    const scoreSum = showcaseProjects.reduce((acc, p) => acc + (p.aiScore || 0), 0);
    return {
      projectCount: count,
      totalPoints: scoreSum,
      averageScore: count > 0 ? Math.round(scoreSum / count) : 0,
    };
  }, [showcaseProjects]);

  return (
    <main className="min-h-screen pb-40">
      {/* Cinematic Hero */}
      <section className="relative min-h-[60vh] pt-36 pb-32 flex items-center justify-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background to-background z-10"></div>
          <div className="absolute inset-0 bg-primary/10 backdrop-blur-3xl"></div>
          {club.logoUrl && (
            <img
              src={club.logoUrl}
              className="w-full h-full object-cover opacity-15 grayscale scale-110 blur-2xl"
              alt=""
            />
          )}
        </div>

        <div className="relative z-20 max-w-5xl mx-auto px-6 w-full text-center space-y-10 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-36 h-36 rounded-[2.5rem] bg-[#07101f]/75 border border-white/10 p-5 backdrop-blur-2xl shadow-2xl flex items-center justify-center overflow-hidden"
          >
            <img
              src={
                club.logoUrl ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  club.name
                )}&background=003F8A&color=fff`
              }
              className="w-full h-full object-contain"
              alt={club.name}
            />
          </motion.div>

          <div className="space-y-4">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[9px] font-black text-primary uppercase tracking-[0.6em]"
            >
              Protocol: Registry // Active Chapter
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-7xl font-black text-white uppercase tracking-tighter font-display italic leading-[1.1] max-w-4xl mx-auto break-words"
              style={{ textShadow: "0 0 80px rgba(255,255,255,0.05)" }}
            >
              {club.name}
            </motion.h1>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 -mt-16 relative z-30">
        {/* Left Column: Command Center */}
        <aside className="lg:col-span-4 space-y-8">
          <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10 backdrop-blur-3xl space-y-12">
            
            {/* Club Showcase Points Dashboard */}
            <div className="space-y-6 bg-primary/5 rounded-[2rem] border border-primary/10 p-8 shadow-inner">
              <p className="text-[9px] font-black text-primary uppercase tracking-[0.4em] italic opacity-80 leading-none">
                AI Portfolio Score
              </p>
              <div className="flex items-end justify-between">
                <div>
                  <h4 className="text-4xl font-black text-white font-display tracking-tight leading-none italic uppercase">
                    {clubScoreStats.totalPoints} <span className="text-primary text-lg">PTS</span>
                  </h4>
                  <p className="text-[8px] font-bold text-white/30 uppercase tracking-widest mt-1">
                    Aggregate District Score
                  </p>
                </div>
                <div className="text-right">
                  <h4 className="text-2xl font-black text-white/80 font-display tracking-tight leading-none italic">
                    {clubScoreStats.averageScore}
                  </h4>
                  <p className="text-[8px] font-bold text-white/30 uppercase tracking-widest mt-1">
                    Avg Project Impact
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="text-sm font-black text-white uppercase tracking-[0.3em] flex items-center gap-4">
                <span className="w-8 h-[1px] bg-primary"></span>
                Operation Parameters
              </h3>

              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-primary border border-white/5">
                    <span className="material-symbols-outlined">verified</span>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-text-muted uppercase tracking-widest">Charter Date</p>
                    <p className="text-lg font-bold text-white uppercase tracking-tight italic">
                      {club.charterDate
                        ? format(new Date(club.charterDate), "MMMM yyyy")
                        : "Classified"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-primary border border-white/5">
                    <span className="material-symbols-outlined">location_on</span>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-text-muted uppercase tracking-widest">Zone & City</p>
                    <p className="text-lg font-bold text-white uppercase tracking-tight italic">
                      {club.zone
                        ? `${club.zone} (${club.city || "Classified"})`
                        : club.city || "District Wide"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-primary border border-white/5">
                    <span className="material-symbols-outlined">home</span>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-text-muted uppercase tracking-widest">Base of Operations</p>
                    <p className="text-lg font-bold text-white uppercase tracking-tight italic">
                      {club.venue || "Classified"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-primary border border-white/5">
                    <span className="material-symbols-outlined">schedule</span>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-text-muted uppercase tracking-widest font-sans">
                      Briefing Schedule
                    </p>
                    <p className="text-lg font-bold text-white uppercase tracking-tight italic">
                      {club.meetingDayTime || "Classified"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-12 border-t border-white/5 space-y-8">
              <h3 className="text-sm font-black text-white uppercase tracking-[0.3em] flex items-center gap-4">
                <span className="w-8 h-[1px] bg-primary"></span>
                Leadership Command
              </h3>

              {/* President */}
              <div className="space-y-4">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-full border-2 border-primary/20 p-1 shrink-0">
                    <div className="w-full h-full rounded-full bg-white/10 overflow-hidden">
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
                          club.presidentName || "President"
                        )}`}
                        className="w-full h-full object-cover"
                        alt="President"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white uppercase tracking-tighter italic leading-none">
                      {club.presidentName || "Classified"}
                    </p>
                    <p className="text-[9px] font-black text-primary uppercase tracking-[0.2em] mt-2">
                      President 24-25
                    </p>
                  </div>
                </div>
                {(club.presidentPhone || club.presidentEmail) && (
                  <div className="pl-4 space-y-1.5 text-[10px] font-semibold text-text-muted/60 uppercase tracking-widest font-sans">
                    {club.presidentPhone && (
                      <p className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">phone</span> {club.presidentPhone}
                      </p>
                    )}
                    {club.presidentEmail && (
                      <p className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">mail</span> {club.presidentEmail}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Secretary */}
              <div className="space-y-4 pt-6 border-t border-white/5">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-full border-2 border-primary/20 p-1 shrink-0">
                    <div className="w-full h-full rounded-full bg-white/10 overflow-hidden">
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
                          club.secretaryName || "Secretary"
                        )}`}
                        className="w-full h-full object-cover"
                        alt="Secretary"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white uppercase tracking-tighter italic leading-none">
                      {club.secretaryName || "Classified"}
                    </p>
                    <p className="text-[9px] font-black text-primary/70 uppercase tracking-[0.2em] mt-2">
                      Secretary 24-25
                    </p>
                  </div>
                </div>
                {(club.secretaryPhone || club.secretaryEmail) && (
                  <div className="pl-4 space-y-1.5 text-[10px] font-semibold text-text-muted/60 uppercase tracking-widest font-sans">
                    {club.secretaryPhone && (
                      <p className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">phone</span> {club.secretaryPhone}
                      </p>
                    )}
                    {club.secretaryEmail && (
                      <p className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">mail</span> {club.secretaryEmail}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="pt-8 border-t border-white/5 space-y-4">
              <a
                href={`/clubs/${club.slug}/login`}
                className="w-full py-4 rounded-2xl bg-primary hover:bg-primary/90 text-white text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <span className="material-symbols-outlined text-lg">vpn_key</span>
                Login as Club Admin
              </a>
            </div>

            <div className="pt-8 border-t border-white/5 flex justify-between gap-4">
              {["language", "public", "share"].map((icon) => (
                <button
                  key={icon}
                  className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 border border-white/5 hover:bg-primary hover:text-white transition-all duration-500"
                >
                  <span className="material-symbols-outlined">{icon}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Right Column: Portfolio, Operations, Feed & Summary */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* Executive Summary */}
          <section className="bg-white/5 border border-white/10 rounded-[3rem] p-12 backdrop-blur-3xl">
            <h2 className="text-3xl font-bold text-white uppercase tracking-tighter font-display italic mb-8">
              Executive Summary
            </h2>
            <p className="text-xl text-text-muted leading-relaxed font-medium opacity-80 italic">
              {club.description ||
                "Information encrypted. This chapter operates with a focus on community development and professional excellence within the district's strategic framework."}
            </p>
          </section>

          {/* Navigation Tabs */}
          <section className="flex justify-center border-b border-white/5 pb-2">
            <div className="flex items-center gap-1 p-1 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl">
              {[
                { key: "operations", label: "Operations", icon: "event", badge: upcomingEvents.length },
                { key: "showcase", label: "Showcase", icon: "emoji_events", badge: showcaseProjects.length },
                { key: "intel", label: "Intel Feed", icon: "rss_feed", badge: feeds.length },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`flex items-center gap-3 px-6 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-[0.25em] transition-all font-sans relative ${
                    activeTab === tab.key ? "bg-primary text-white" : "text-white/30 hover:text-white"
                  }`}
                >
                  <span className="material-symbols-outlined text-base">{tab.icon}</span>
                  {tab.label}
                  {tab.badge > 0 && (
                    <span className={`text-[8px] font-black font-mono px-2 py-0.5 rounded-full ${
                      activeTab === tab.key ? "bg-white text-primary" : "bg-white/10 text-white/60"
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </section>

          {/* Tab Content Display */}
          <div className="space-y-10">
            <AnimatePresence mode="wait">
              
              {/* Tab 1: Showcase (Completed Projects) */}
              {activeTab === "showcase" && (
                <motion.div
                  key="showcase"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-10"
                >
                  {/* Search and Filters */}
                  {showcaseProjects.length > 0 && (
                    <div className="flex flex-col sm:flex-row items-center gap-6 bg-white/5 p-6 rounded-[2rem] border border-white/5 backdrop-blur-xl">
                      <div className="relative flex-1 w-full">
                        <span className="absolute left-5 top-1/2 -translate-y-1/2 material-symbols-outlined text-primary/40">
                          search
                        </span>
                        <input
                          type="text"
                          placeholder="SEARCH PROJECT PORTFOLIO..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full bg-white/5 border border-white/5 rounded-xl pl-14 pr-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] focus:outline-none focus:border-primary/30 transition-all text-white placeholder:text-white/15"
                        />
                      </div>
                      {projectCategories.length > 2 && (
                        <div className="relative w-full sm:w-56 shrink-0">
                          <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="w-full appearance-none pl-5 pr-12 py-4 rounded-xl bg-white/5 border border-white/5 text-[9px] font-black uppercase tracking-widest cursor-pointer outline-none focus:border-primary/30 transition-all text-white"
                          >
                            {projectCategories.map((cat) => (
                              <option key={cat} value={cat} className="bg-[#020617] uppercase">
                                {cat === "All" ? "ALL CATEGORIES" : cat.toUpperCase()}
                              </option>
                            ))}
                          </select>
                          <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary/40">
                            expand_more
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Showcase Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredProjects.map((proj) => {
                      const glowBorder =
                        (proj.aiScore || 0) >= 80
                          ? "hover:border-[#FFD700]/30"
                          : (proj.aiScore || 0) >= 50
                          ? "hover:border-[#C0C0C0]/30"
                          : "hover:border-primary/20";
                      
                      return (
                        <div
                          key={proj.id}
                          onClick={() => setSelectedProject(proj)}
                          className={`group relative bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/5 shadow-ambient overflow-hidden transition-all duration-700 hover:shadow-2xl ${glowBorder} flex flex-col h-full cursor-pointer`}
                        >
                          <div className="h-60 w-full overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10 opacity-70 group-hover:opacity-40 transition-opacity duration-700"></div>
                            <img
                              src={proj.imageUrl || "/rotaract_icon.png"}
                              alt={proj.title}
                              className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                            />
                            {proj.aiScore && (
                              <div className="absolute top-6 right-6 z-20">
                                <span className="bg-primary/95 backdrop-blur-md text-white text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-[0.2em] shadow-xl border border-white/10 flex items-center gap-1.5 font-mono">
                                  <span className="material-symbols-outlined text-xs text-[#FFD700]">diamond</span>
                                  {proj.aiScore} pts
                                </span>
                              </div>
                            )}
                          </div>

                          <div className="p-8 flex flex-col flex-grow justify-between gap-6">
                            <div className="space-y-4">
                              <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-primary">
                                <span>{proj.category || "PROJECT"}</span>
                                <span className="text-white/20">{proj.yearDateLabel || proj.eventDate ? format(new Date(proj.eventDate!), 'yyyy') : ''}</span>
                              </div>
                              <h4 className="text-2xl font-black text-white leading-tight font-display tracking-tight uppercase group-hover:text-primary transition-colors line-clamp-2">
                                {proj.title}
                              </h4>
                              <p className="text-text-muted text-sm font-medium leading-relaxed line-clamp-3 italic opacity-70">
                                {proj.description}
                              </p>
                            </div>

                            <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 group-hover:text-primary transition-all">
                                View Case Study
                              </span>
                              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
                                  arrow_right_alt
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {filteredProjects.length === 0 && (
                      <div className="col-span-full py-20 bg-white/5 border border-white/5 border-dashed rounded-[3rem] flex flex-col items-center justify-center text-center opacity-40">
                        <span className="material-symbols-outlined text-4xl mb-4">folder_open</span>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em]">
                          {searchQuery || categoryFilter !== "All"
                            ? "No matches found in showcase"
                            : "No projects in showcase yet"}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Tab 2: Operations (Upcoming Events) */}
              {activeTab === "operations" && (
                <motion.div
                  key="operations"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                  {upcomingEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      title={event.title}
                      date={event.eventDate ? format(new Date(event.eventDate), "dd MMM") : "TBD"}
                      description={event.description || ""}
                      image={event.imageUrl || "/rotaract_icon.png"}
                      slug={event.slug}
                      badge={event.isSignatureProject ? "Signature" : "Mission"}
                      statusBadge="UPCOMING"
                      rsvpLink={event.rsvpLink}
                    />
                  ))}

                  {upcomingEvents.length === 0 && (
                    <div className="col-span-full py-20 bg-white/5 border border-white/5 border-dashed rounded-[3rem] flex flex-col items-center justify-center text-center opacity-40">
                      <span className="material-symbols-outlined text-4xl mb-4">event_busy</span>
                      <p className="text-[10px] font-black uppercase tracking-[0.3em]">
                        No active operations detected
                      </p>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Tab 3: Intel Feed */}
              {activeTab === "intel" && (
                <motion.div
                  key="intel"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-6"
                >
                  {feeds.map((feed) => (
                    <div
                      key={feed.id}
                      className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] flex flex-col md:flex-row gap-8 group hover:bg-white/10 transition-all duration-500"
                    >
                      {feed.mediaUrl && (
                        <div className="w-full md:w-48 h-32 rounded-3xl overflow-hidden shrink-0 border border-white/5">
                          <img
                            src={feed.mediaUrl}
                            className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                            alt=""
                          />
                        </div>
                      )}
                      <div className="space-y-4">
                        <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">
                          {format(new Date(feed.createdAt), "dd MMMM yyyy")}
                        </p>
                        <h4 className="text-xl font-bold text-white uppercase tracking-tight italic group-hover:text-primary transition-colors">
                          {feed.title}
                        </h4>
                        <p className="text-sm text-text-muted font-medium line-clamp-2 opacity-70 italic">
                          {feed.content}
                        </p>
                      </div>
                    </div>
                  ))}

                  {feeds.length === 0 && (
                    <div className="py-20 bg-white/5 border border-white/5 border-dashed rounded-[3rem] flex flex-col items-center justify-center text-center opacity-40">
                      <span className="material-symbols-outlined text-4xl mb-4">rss_feed</span>
                      <p className="text-[10px] font-black uppercase tracking-[0.3em]">
                        Quiet on the frequency
                      </p>
                    </div>
                  )}
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Project Details Showcase Drawer */}
      <SlidePanel
        open={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject ? `Case Study: <span class="text-primary">${selectedProject.title}</span>` : ""}
        subtitle={selectedProject ? `${selectedProject.category || "Project Showcase"} · ${selectedProject.yearDateLabel || "District 3192"}` : ""}
        icon="emoji_events"
        accentColor="blue"
      >
        {selectedProject && (
          <div className="space-y-10 pb-20">
            {/* Cover Image */}
            {selectedProject.imageUrl && (
              <div className="w-full h-80 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src={selectedProject.imageUrl}
                  className="w-full h-full object-cover"
                  alt={selectedProject.title}
                />
              </div>
            )}

            {/* General Info */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 bg-white/5 rounded-[2rem] p-8 border border-white/5 text-center">
              <div>
                <p className="text-[8px] font-black uppercase tracking-widest text-white/30">Category</p>
                <p className="text-base font-bold text-white uppercase tracking-tight mt-1">
                  {selectedProject.category || "Classified"}
                </p>
              </div>
              <div>
                <p className="text-[8px] font-black uppercase tracking-widest text-white/30">Temporal Label</p>
                <p className="text-base font-bold text-white uppercase tracking-tight mt-1">
                  {selectedProject.yearDateLabel || "2025-26"}
                </p>
              </div>
              <div className="col-span-2 md:col-span-1">
                <p className="text-[8px] font-black uppercase tracking-widest text-white/30">Impact Points</p>
                <p className="text-base font-bold text-[#FFD700] uppercase tracking-tight mt-1">
                  {selectedProject.aiScore ? `${selectedProject.aiScore} Pts` : "Awaiting Audit"}
                </p>
              </div>
            </div>

            {/* AI Scorecard & Report */}
            {selectedProject.aiScore && (
              <div className="bg-primary/5 border border-primary/10 rounded-[2.5rem] p-8 md:p-10 space-y-6">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-yellow-400 text-3xl">psychology</span>
                  <div>
                    <h3 className="text-lg font-bold text-white font-display uppercase tracking-wider leading-none">
                      District AI Evaluation
                    </h3>
                    <p className="text-[8px] font-bold text-white/30 uppercase tracking-widest mt-1">
                      Objective impact & uniqueness verification audit
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5">
                  {selectedProject.aiAnalysis ? (
                    <MarkdownReport content={selectedProject.aiAnalysis} />
                  ) : (
                    <div className="text-xs text-white/40 italic">
                      Performance scorecard successfully archived. Score: {selectedProject.aiScore}/100.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Main Narrative */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white font-display uppercase tracking-wider">
                Project Narrative
              </h3>
              <p className="text-sm text-white/70 leading-relaxed font-light whitespace-pre-wrap">
                {selectedProject.description}
              </p>
            </div>

            {/* Markdown Case Study / Full Content */}
            {selectedProject.fullContent && (
              <div className="space-y-4 pt-6 border-t border-white/5">
                <h3 className="text-lg font-bold text-white font-display uppercase tracking-wider">
                  Case Details
                </h3>
                <div className="text-sm text-white/60 leading-relaxed font-light prose prose-invert max-w-none prose-sm whitespace-pre-wrap">
                  {selectedProject.fullContent}
                </div>
              </div>
            )}

            {/* Gallery Images */}
            {selectedProject.galleryImages && parseJsonSafe<string[]>(selectedProject.galleryImages, []).length > 0 && (
              <div className="space-y-6 pt-6 border-t border-white/5">
                <h3 className="text-lg font-bold text-white font-display uppercase tracking-wider">
                  Operational Capture (Gallery)
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {parseJsonSafe<string[]>(selectedProject.galleryImages, []).map((imgUrl, i) => (
                    <div
                      key={i}
                      className="h-44 rounded-2xl overflow-hidden border border-white/5 hover:border-primary/40 transition-all shadow-md group cursor-pointer"
                    >
                      <img
                        src={imgUrl}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        alt={`Gallery ${i}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* External Links */}
            {selectedProject.featuredLinks && parseJsonSafe<{ label: string; url: string }[]>(selectedProject.featuredLinks, []).length > 0 && (
              <div className="space-y-6 pt-6 border-t border-white/5">
                <h3 className="text-lg font-bold text-white font-display uppercase tracking-wider">
                  Reference Links
                </h3>
                <div className="flex flex-wrap gap-4">
                  {parseJsonSafe<{ label: string; url: string }[]>(selectedProject.featuredLinks, []).map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-xs text-white/70 hover:text-white hover:bg-white/10 hover:border-primary/40 transition-all flex items-center gap-3 no-underline"
                    >
                      <span className="material-symbols-outlined text-base">link</span>
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </SlidePanel>
    </main>
  );
}
