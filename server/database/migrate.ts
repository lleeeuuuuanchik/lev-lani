import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import Database from 'better-sqlite3';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const dbPath = process.env.NUXT_DB_FILE_NAME || './data/levlani.db';
mkdirSync(dirname(resolve(dbPath)), { recursive: true });

const sqlite = new Database(dbPath);
const db = drizzle(sqlite);

migrate(db, { migrationsFolder: './server/database/migrations' });
console.log('Migrations applied successfully');
sqlite.close();
