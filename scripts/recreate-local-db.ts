import Database from 'better-sqlite3';
import { readFileSync } from 'fs';

console.log('Opening local database (local.sqlite)...');
const db = new Database('local.sqlite');

console.log('Dropping existing tables if they exist...');
const dropQueries = [
  'DROP TABLE IF EXISTS announcements;',
  'DROP TABLE IF EXISTS attendance;',
  'DROP TABLE IF EXISTS audit_logs;',
  'DROP TABLE IF EXISTS campaigns;',
  'DROP TABLE IF EXISTS clubs;',
  'DROP TABLE IF EXISTS cold_storage_files;',
  'DROP TABLE IF EXISTS course_modules;',
  'DROP TABLE IF EXISTS courses;',
  'DROP TABLE IF EXISTS event_registrations;',
  'DROP TABLE IF EXISTS events;',
  'DROP TABLE IF EXISTS feeds;',
  'DROP TABLE IF EXISTS jobs;',
  'DROP TABLE IF EXISTS mentorship_applications;',
  'DROP TABLE IF EXISTS moms;',
  'DROP TABLE IF EXISTS newsletters;',
  'DROP TABLE IF EXISTS past_leaders;',
  'DROP TABLE IF EXISTS point_transactions;',
  'DROP TABLE IF EXISTS service_hours;',
  'DROP TABLE IF EXISTS user_achievements;',
  'DROP TABLE IF EXISTS users;'
];

for (const query of dropQueries) {
  db.exec(query);
}

console.log('Initializing local database from corrected schema.sql...');
const schema = readFileSync('schema.sql', 'utf8');
db.exec(schema);

console.log('Seeding local database from seed.sql...');
const seed = readFileSync('seed.sql', 'utf8');
db.exec(seed);

console.log('Local database successfully recreated and seeded!');
db.close();
