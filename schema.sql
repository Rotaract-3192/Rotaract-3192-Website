-- Rotaract District 3192 - Database Schema (Cloudflare D1)

-- Users Table: Stores member profiles, roles, and achievements
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY, -- Clerk User ID
    email TEXT UNIQUE NOT NULL,
    first_name TEXT,
    last_name TEXT,
    role TEXT DEFAULT 'member', -- 'member', 'club_admin', 'district_admin'
    club_id TEXT,
    bio TEXT,
    avatar_url TEXT,
    points INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Clubs Table: Stores club information
CREATE TABLE IF NOT EXISTS clubs (
    id TEXT PRIMARY KEY, -- ULID or UUID
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    charter_date DATETIME,
    description TEXT,
    logo_url TEXT,
    president_id TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Events Table: Stores initiatives and projects
CREATE TABLE IF NOT EXISTS events (
    id TEXT PRIMARY KEY,
    club_id TEXT NOT NULL,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    event_date DATETIME NOT NULL,
    location TEXT,
    image_url TEXT,
    is_signature_project BOOLEAN DEFAULT FALSE,
    status TEXT DEFAULT 'upcoming', -- 'upcoming', 'past', 'cancelled'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Event Registrations
CREATE TABLE IF NOT EXISTS event_registrations (
    id TEXT PRIMARY KEY,
    event_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    registered_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    status TEXT DEFAULT 'confirmed', -- 'confirmed', 'attended', 'cancelled'
    UNIQUE(event_id, user_id)
);

-- Treasury / Campaigns Table: For crowdfunding initiatives
CREATE TABLE IF NOT EXISTS campaigns (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    goal_amount REAL NOT NULL,
    raised_amount REAL DEFAULT 0,
    status TEXT DEFAULT 'active', -- 'active', 'completed', 'paused'
    created_by TEXT NOT NULL, -- Admin User ID
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Cold Storage Table: Metadata for files stored in Cloudflare R2
CREATE TABLE IF NOT EXISTS cold_storage_files (
    id TEXT PRIMARY KEY,
    file_name TEXT NOT NULL,
    file_size INTEGER NOT NULL,
    mime_type TEXT,
    r2_key TEXT UNIQUE NOT NULL, -- Path/Key in R2 bucket
    uploaded_by TEXT NOT NULL, -- Admin User ID
    category TEXT DEFAULT 'general', -- e.g., 'reports', 'media', 'documents'
    is_public BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- User Achievements Table
CREATE TABLE IF NOT EXISTS user_achievements (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    badge_icon TEXT, -- URL or icon name
    awarded_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Courses (LMS) Table
CREATE TABLE IF NOT EXISTS courses (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    thumbnail_url TEXT,
    modules_count INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Feeds Table
CREATE TABLE IF NOT EXISTS feeds (
    id TEXT PRIMARY KEY,
    type TEXT, -- e.g. 'article', 'video', 'announcement'
    title TEXT NOT NULL,
    content TEXT,
    media_url TEXT,
    author_id TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Jobs Table
CREATE TABLE IF NOT EXISTS jobs (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    company TEXT,
    location TEXT,
    type TEXT, -- 'Full-time', 'Internship', etc.
    description TEXT,
    apply_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Minutes of Meetings (MoM) Table
CREATE TABLE IF NOT EXISTS moms (
    id TEXT PRIMARY KEY,
    club_id TEXT,
    title TEXT NOT NULL,
    meeting_date DATETIME NOT NULL,
    file_url TEXT,
    status TEXT DEFAULT 'pending', -- 'pending', 'approved'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Newsletters Table
CREATE TABLE IF NOT EXISTS newsletters (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    issue_date DATETIME NOT NULL,
    file_url TEXT,
    thumbnail_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Announcements Table
CREATE TABLE IF NOT EXISTS announcements (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    priority TEXT DEFAULT 'normal', -- 'normal', 'high'
    created_by TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Mentorship Applications Table
CREATE TABLE IF NOT EXISTS mentorship_applications (
    id TEXT PRIMARY KEY,
    mentor_id TEXT NOT NULL,   -- users.id
    mentee_id TEXT NOT NULL,   -- users.id
    message TEXT,
    status TEXT DEFAULT 'pending', -- 'pending', 'accepted', 'rejected', 'completed'
    domain TEXT,               -- e.g. 'leadership', 'marketing', 'technology'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Course Modules Table
CREATE TABLE IF NOT EXISTS course_modules (
    id TEXT PRIMARY KEY,
    course_id TEXT NOT NULL,   -- courses.id
    title TEXT NOT NULL,
    description TEXT,
    video_url TEXT,
    duration INTEGER,          -- in minutes
    "order" INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Service Hours Table
CREATE TABLE IF NOT EXISTS service_hours (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,     -- users.id
    event_id TEXT,             -- events.id (optional)
    hours REAL NOT NULL,
    description TEXT,
    logged_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    approved_by TEXT           -- admin users.id
);
