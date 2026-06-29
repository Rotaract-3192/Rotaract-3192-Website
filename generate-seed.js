import fs from 'fs';
import path from 'path';

const MOCK_DIR = path.join(process.cwd(), 'src', 'mock');
const SEED_FILE = path.join(process.cwd(), 'seed.sql');

function escapeSql(val) {
  if (val === null || val === undefined) return 'NULL';
  if (typeof val === 'number') return val;
  if (typeof val === 'boolean') return val ? 'true' : 'false';
  // Escape single quotes by doubling them
  const str = String(val).replace(/'/g, "''");
  return `'${str}'`;
}

function processTable(tableName, data) {
  if (!data || data.length === 0) return '';
  
  let sql = `-- Seed for ${tableName}\n`;
  
  data.forEach((row) => {
    let keys = Object.keys(row);
    let values = keys.map(k => escapeSql(row[k]));
    
    // Convert keys from camelCase to snake_case if they exist
    const snakeKeys = keys.map(k => k.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`));
    
    sql += `INSERT INTO ${tableName} (${snakeKeys.join(', ')}) VALUES (${values.join(', ')}) ON CONFLICT (id) DO NOTHING;\n`;
  });
  
  return sql + '\n';
}

function run() {
  let finalSql = '-- Auto-generated seed data for PostgreSQL (Supabase)\n\n';
  
  // 1. Clubs
  if (fs.existsSync(path.join(MOCK_DIR, 'clubs.json'))) {
    const clubs = JSON.parse(fs.readFileSync(path.join(MOCK_DIR, 'clubs.json'), 'utf8'));
    // Map to clubs table schema
    const mappedClubs = clubs.map(c => ({
      id: c.slug, // Using slug as ID for simplicity since mock doesn't have ID
      slug: c.slug,
      name: c.name,
      description: `Club in ${c.city}`,
      logo_url: c.logo_url
    }));
    finalSql += processTable('clubs', mappedClubs);
  }

  // 2. Members -> Users
  if (fs.existsSync(path.join(MOCK_DIR, 'members.json'))) {
    const members = JSON.parse(fs.readFileSync(path.join(MOCK_DIR, 'members.json'), 'utf8'));
    const mappedUsers = members.map((m, i) => ({
      id: `user_${i}`,
      email: `${m.name.replace(/\s+/g, '').toLowerCase()}@example.com`,
      first_name: m.name.split(' ')[0],
      last_name: m.name.split(' ')[1] || '',
      role: m.role.toLowerCase().includes('admin') ? 'club_admin' : 'member',
      avatar_url: m.profile_pic_url
    }));
    finalSql += processTable('users', mappedUsers);
  }

  // 3. Events
  if (fs.existsSync(path.join(MOCK_DIR, 'events.json'))) {
    const events = JSON.parse(fs.readFileSync(path.join(MOCK_DIR, 'events.json'), 'utf8'));
    const mappedEvents = events.map(e => ({
      id: e.slug || `evt_${Math.random().toString(36).substring(2, 9)}`,
      club_id: e.host_club_slug || 'rac-chennai', // Match a real club ID from seed
      title: e.title,
      slug: e.slug || e.title.toLowerCase().replace(/\s+/g, '-'),
      event_date: e.date ? new Date(e.date).toISOString() : new Date().toISOString(),
      location: e.location || 'Online',
      image_url: e.banner_url || e.thumbnail_url
    }));
    finalSql += processTable('events', mappedEvents);
  }

  // 4. Courses
  if (fs.existsSync(path.join(MOCK_DIR, 'courses.json'))) {
    const courses = JSON.parse(fs.readFileSync(path.join(MOCK_DIR, 'courses.json'), 'utf8'));
    const mappedCourses = courses.map(c => ({
      id: c.id,
      title: c.title,
      description: c.description,
      thumbnail_url: c.thumbnail_url,
      modules_count: c.lessons ? c.lessons.length : 0
    }));
    finalSql += processTable('courses', mappedCourses);
  }

  // 5. Jobs
  if (fs.existsSync(path.join(MOCK_DIR, 'jobs.json'))) {
    const jobs = JSON.parse(fs.readFileSync(path.join(MOCK_DIR, 'jobs.json'), 'utf8'));
    const mappedJobs = jobs.map(j => ({
      id: j.id,
      title: j.title,
      company: j.company,
      location: 'Remote',
      type: j.type,
      description: j.description,
      apply_url: j.apply_url
    }));
    finalSql += processTable('jobs', mappedJobs);
  }

  fs.writeFileSync(SEED_FILE, finalSql, 'utf8');
  console.log('Successfully generated seed.sql');
}

run();
