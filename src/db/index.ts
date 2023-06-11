import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const user = process.env.DB_USER;
const host = process.env.DB_HOST;
const database = process.env.DB_DATABASE;
const password = process.env.DB_PASSWORD;
const port = +process.env.DB_PORT;

export const pool = new Pool({
	user: user,
	host: host,
	database: database,
	password: password,
	port: port,
	ssl: true,
});
