import { Pool } from 'pg';

export const pool = new Pool({
  user: 'me',
  host: 'dpg-cheh9dl269v75d1t6dp0-a.frankfurt-postgres.render.com',
  database: 'blogdb_w0n2',
  password: '8Hr3ZvAQuQdds612cDCVH9I2zXUDlTmQ',
  port: 5432,
  ssl: true,
});
