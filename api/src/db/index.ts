import { Pool } from 'pg';

export const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'blogs',
  password: 'password',
  port: 5432,
});
