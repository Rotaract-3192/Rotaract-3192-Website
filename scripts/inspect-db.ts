import Database from 'better-sqlite3';

const db = new Database('local.sqlite');

try {
  console.log('--- Users Table Columns ---');
  const usersInfo = db.prepare('PRAGMA table_info(users)').all();
  console.log(usersInfo);

  console.log('--- Clubs Table Columns ---');
  const clubsInfo = db.prepare('PRAGMA table_info(clubs)').all();
  console.log(clubsInfo);
} catch (e) {
  console.error('Error inspecting tables:', e);
} finally {
  db.close();
}
