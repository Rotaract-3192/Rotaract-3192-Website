import Database from 'better-sqlite3';
import { readFileSync } from 'fs';
import { join } from 'path';

const db = new Database('local.sqlite');

console.log('Initializing local database...');

const schema = readFileSync('schema.sql', 'utf8');
db.exec(schema);

console.log('Seeding local database...');
const seed = readFileSync('seed.sql', 'utf8');
// better-sqlite3 exec can handle multiple statements
db.exec(seed);

console.log('Local database initialized and seeded successfully!');
db.close();
