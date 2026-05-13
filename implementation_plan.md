# Codebase Audit & Implementation Plan

This document outlines the findings from auditing the current codebase against the original `rotaract3192_build_prompt_v2.md` requirements and proposes a plan to align or "fix" the codebase based on your goals.

## 🚨 Major Architectural Deviations Identified

The current codebase has deviated significantly from the original `.md` prompt in a few fundamental ways. These were likely decisions made during development to speed things up, but we need to decide whether to **keep them** or **revert** to the original prompt's instructions.

### 1. Framework: Next.js vs. Hono.js
*   **What the prompt asked for:** A two-phase build. Phase 1: Vanilla HTML/JS or Astro. Phase 2: A separate Cloudflare Worker API using **Hono.js**.
*   **What is currently built:** A full-stack **Next.js 16** application using React, Server Actions, and `@opennextjs/cloudflare`. 
*   **Impact:** The current Next.js setup is modern and powerful, and it is actively working with Cloudflare Pages. Rewriting to Hono.js + vanilla frontend would mean throwing away almost the entire existing codebase.

### 2. Authentication: Clerk vs. Custom JWT/OTP
*   **What the prompt asked for:** Custom OTP login flow via ZeptoMail and custom JWT token management using the `jose` library.
*   **What is currently built:** **Clerk** Authentication (`@clerk/nextjs`).
*   **Impact:** Clerk handles all the heavy lifting of user management, security, and OTPs securely out-of-the-box. Reverting to custom JWT/ZeptoMail would require building and maintaining custom auth flows from scratch.

### 3. Database Schema Variations
*   **What the prompt asked for:** A specific SQL schema with tables like `districts`, `user_roles`, `ticket_tiers`, `lessons`, etc.
*   **What is currently built:** A slightly modified schema (`schema.sql`) tailored for Drizzle ORM. It has similar concepts (`users`, `clubs`, `events`, `courses`) but the exact columns and relations differ slightly from the markdown.

---

## User Review Required

> [!WARNING]
> **I need your explicit decision on the architectural deviations before I start "fixing" the entire codebase.**

Please let me know how you want to proceed regarding the deviations above:

1.  **Stick with the current stack (Next.js + Clerk):** This is the fastest path forward. I will fix any bugs, improve the UI to match the prompt's design system, ensure all pages listed in the `.md` are fully functional, and ensure the Drizzle D1 integration is solid.
2.  **Strictly follow the `.md` prompt (Hono.js + Custom Auth):** This will require a massive rewrite, essentially starting over for the backend and ripping out Next.js/Clerk. 

**Recommendation:** I strongly recommend Option 1 (stick with Next.js + Clerk). It provides a more robust, maintainable, and secure foundation than building custom JWT auth from scratch, and the Next.js app is already deeply scaffolded.

---

## Proposed Changes (Assuming Option 1: Next.js + Clerk)

If we proceed with refining the current Next.js codebase to fulfill the feature requirements of the `.md` file, here is the plan:

### 1. Feature Completion Audit
We will go through every route requested in the `.md` and ensure it works with the real D1 database (no mock data, since we are past Phase 1).

*   **Public Pages:** `/`, `/about`, `/news`, `/hall-of-fame`, `/newsletter`, `/resources`, `/brand-centre`, `/clubs`, `/jobs`, `/events`.
*   **Member Portal:** `/dashboard`, `/profile`, `/lms`, `/mom`, `/mentorship`, `/leaderboard`.
*   **Admin Panel:** `/admin/clubs`, `/admin/members`, `/admin/events`, `/admin/feeds`, `/admin/campaigns`, `/admin/announcements`, `/admin/audit`.

### 2. Codebase Fixes & Cleanup
*   **Drizzle Schema Alignment:** Ensure `src/lib/db/schema.ts` perfectly matches the tables in `schema.sql` and that all relations are correctly defined.
*   **Data Fetching:** Standardize all data fetching to use Server Actions in `src/app/actions` with proper error handling.
*   **UI/UX Polish:** Apply the strict Design System from the `.md` (Rotaract Gold/Blue, Inter font, specific border radii and shadows) globally via Tailwind.

## Verification Plan

1.  **Automated Checks:** Ensure `npm run build` succeeds without type errors or Next.js build errors.
2.  **Manual Verification:** Walk through the authentication flow (Clerk), member dashboard access, and admin panel access locally. Verify CRUD operations for Clubs and Events write successfully to the local SQLite/D1 database.
