PRAGMA defer_foreign_keys = ON;
PRAGMA foreign_keys = OFF;
-- Seed for clubs
INSERT OR IGNORE INTO clubs (id, slug, name, description, logo_url) VALUES ('rac-chennai', 'rac-chennai', 'Rotaract Club of Chennai', 'Club in Chennai', 'https://placehold.co/400x400/003F8A/FFFFFF?text=RAC+Chennai');
INSERT OR IGNORE INTO clubs (id, slug, name, description, logo_url) VALUES ('rac-bengaluru-central', 'rac-bengaluru-central', 'Rotaract Club of Bengaluru Central', 'Club in Bengaluru', 'https://placehold.co/400x400/F5A623/FFFFFF?text=RAC+Blr');
INSERT OR IGNORE INTO clubs (id, slug, name, description, logo_url) VALUES ('rac-coimbatore-cosmos', 'rac-coimbatore-cosmos', 'Rotaract Club of Coimbatore Cosmos', 'Club in Coimbatore', 'https://placehold.co/400x400/00732A/FFFFFF?text=RAC+CBE');
INSERT OR IGNORE INTO clubs (id, slug, name, description, logo_url) VALUES ('rac-mysuru-royal', 'rac-mysuru-royal', 'Rotaract Club of Mysuru Royal', 'Club in Mysuru', 'https://placehold.co/400x400/8A003F/FFFFFF?text=RAC+Mysuru');
INSERT OR IGNORE INTO clubs (id, slug, name, description, logo_url) VALUES ('rac-salem-steels', 'rac-salem-steels', 'Rotaract Club of Salem Steels', 'Club in Salem', 'https://placehold.co/400x400/4A4A4A/FFFFFF?text=RAC+Salem');

-- Seed for users
INSERT OR IGNORE INTO users (id, email, first_name, last_name, role, avatar_url) VALUES ('user_0', 'arjunkumar@example.com', 'Arjun', 'Kumar', 'member', 'https://ui-avatars.com/api/?name=Arjun+Kumar&background=random');
INSERT OR IGNORE INTO users (id, email, first_name, last_name, role, avatar_url) VALUES ('user_1', 'priyasharma@example.com', 'Priya', 'Sharma', 'member', 'https://ui-avatars.com/api/?name=Priya+Sharma&background=random');
INSERT OR IGNORE INTO users (id, email, first_name, last_name, role, avatar_url) VALUES ('user_2', 'karthikreddy@example.com', 'Karthik', 'Reddy', 'club_admin', 'https://ui-avatars.com/api/?name=Karthik+Reddy&background=random');
INSERT OR IGNORE INTO users (id, email, first_name, last_name, role, avatar_url) VALUES ('user_3', 'snehapatil@example.com', 'Sneha', 'Patil', 'member', 'https://ui-avatars.com/api/?name=Sneha+Patil&background=random');
INSERT OR IGNORE INTO users (id, email, first_name, last_name, role, avatar_url) VALUES ('user_4', 'vikramsingh@example.com', 'Vikram', 'Singh', 'member', 'https://ui-avatars.com/api/?name=Vikram+Singh&background=random');
INSERT OR IGNORE INTO users (id, email, first_name, last_name, role, avatar_url) VALUES ('user_5', 'lakshminarayanan@example.com', 'Lakshmi', 'Narayanan', 'member', 'https://ui-avatars.com/api/?name=Lakshmi+Narayanan&background=random');
INSERT OR IGNORE INTO users (id, email, first_name, last_name, role, avatar_url) VALUES ('user_6', 'nithingowda@example.com', 'Nithin', 'Gowda', 'member', 'https://ui-avatars.com/api/?name=Nithin+Gowda&background=random');
INSERT OR IGNORE INTO users (id, email, first_name, last_name, role, avatar_url) VALUES ('user_7', 'ananyabhat@example.com', 'Ananya', 'Bhat', 'member', 'https://ui-avatars.com/api/?name=Ananya+Bhat&background=random');
INSERT OR IGNORE INTO users (id, email, first_name, last_name, role, avatar_url) VALUES ('user_8', 'rahulverma@example.com', 'Rahul', 'Verma', 'member', 'https://ui-avatars.com/api/?name=Rahul+Verma&background=random');
INSERT OR IGNORE INTO users (id, email, first_name, last_name, role, avatar_url) VALUES ('user_9', 'deepakrishnan@example.com', 'Deepa', 'Krishnan', 'member', 'https://ui-avatars.com/api/?name=Deepa+Krishnan&background=random');

-- Seed for events
INSERT OR IGNORE INTO events (id, club_id, title, slug, event_date, location, image_url) VALUES ('coastal-cleanup-drive-2026', 'RAC-A', 'Coastal Cleanup Drive', 'coastal-cleanup-drive-2026', '2026-05-09T15:33:57.480Z', NULL, 'https://placehold.co/1200x600/003F8A/FFFFFF?text=Coastal+Cleanup');
INSERT OR IGNORE INTO events (id, club_id, title, slug, event_date, location, image_url) VALUES ('leadership-summit-2026', 'RAC-A', 'Leadership Summit 2026', 'leadership-summit-2026', '2026-05-09T15:33:57.481Z', NULL, 'https://placehold.co/1200x600/F5A623/FFFFFF?text=Leadership+Summit');
INSERT OR IGNORE INTO events (id, club_id, title, slug, event_date, location, image_url) VALUES ('green-earth-trek', 'RAC-A', 'Green Earth Trek', 'green-earth-trek', '2026-05-09T15:33:57.481Z', NULL, 'https://placehold.co/1200x600/00732A/FFFFFF?text=Green+Earth+Trek');
INSERT OR IGNORE INTO events (id, club_id, title, slug, event_date, location, image_url) VALUES ('blood-donation-camp-mysuru', 'RAC-A', 'Blood Donation Camp', 'blood-donation-camp-mysuru', '2026-05-09T15:33:57.481Z', NULL, 'https://placehold.co/1200x600/8A003F/FFFFFF?text=Blood+Donation+Camp');
INSERT OR IGNORE INTO events (id, club_id, title, slug, event_date, location, image_url) VALUES ('youth-conclave-2025', 'RAC-A', 'Youth Conclave - Past Event', 'youth-conclave-2025', '2026-05-09T15:33:57.481Z', NULL, 'https://placehold.co/1200x600/333333/FFFFFF?text=Youth+Conclave');
INSERT OR IGNORE INTO events (id, club_id, title, slug, event_date, location, image_url) VALUES ('startup-pitch-night', 'RAC-A', 'Startup Pitch Night', 'startup-pitch-night', '2026-05-09T15:33:57.481Z', NULL, 'https://placehold.co/1200x600/F5A623/FFFFFF?text=Startup+Pitch+Night');

-- Seed for courses
INSERT OR IGNORE INTO courses (id, title, description, thumbnail_url, modules_count) VALUES ('course-01', 'Rotaract Leadership Basics', 'Leadership', 'https://placehold.co/800x450/4A90E2/FFFFFF?text=Leadership+Basics', 0);
INSERT OR IGNORE INTO courses (id, title, description, thumbnail_url, modules_count) VALUES ('course-02', 'Digital Marketing for Clubs', 'Marketing', 'https://placehold.co/800x450/E24A4A/FFFFFF?text=Digital+Marketing', 0);
INSERT OR IGNORE INTO courses (id, title, description, thumbnail_url, modules_count) VALUES ('course-03', 'Fundraising 101', 'Finance', 'https://placehold.co/800x450/4AE273/FFFFFF?text=Fundraising', 0);
INSERT OR IGNORE INTO courses (id, title, description, thumbnail_url, modules_count) VALUES ('course-04', 'Public Speaking Mastery', 'Professional Development', 'https://placehold.co/800x450/9B4AE2/FFFFFF?text=Public+Speaking', 0);

-- Seed for jobs
INSERT OR IGNORE INTO jobs (id, title, company, location, type, description) VALUES ('job_01', 'Tech Intern', 'TechSolutions India', 'Remote', 'internship', 'Exciting internship for tech enthusiasts.');
INSERT OR IGNORE INTO jobs (id, title, company, location, type, description) VALUES ('job_02', 'Growth Manager', 'GrowthWorks', 'Bengaluru', 'job', 'Help us grow our footprint across India.');
INSERT OR IGNORE INTO jobs (id, title, company, location, type, description) VALUES ('job_03', 'Creative Lead', 'Creative Minds Agency', 'Chennai', 'job', 'Lead our creative department to new heights.');
INSERT OR IGNORE INTO jobs (id, title, company, location, type, description) VALUES ('job_04', 'Social Media Intern', 'DigiBuzz', 'Remote', 'internship', 'Manage and grow our social media presence.');

