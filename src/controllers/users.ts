import { pool } from '../db';
import { Request, Response } from 'express';

export const getAllUsers = async (req: Request, res: Response) => {
	const client = await pool.connect();
	try {
		const sql = 'SELECT id, username, email FROM users';
		const { rows } = await client.query(sql);
		const users = rows;

		res.status(200).json(users);
	} catch (error) {
		res.status(400).send(error);
	} finally {
		client.release();
	}
};

export const getUserById = async (req: Request, res: Response) => {
	const client = await pool.connect();
	try {
		const id = parseInt(req.params.id);

		const sql = 'SELECT * FROM users where id = $1';
		const { rows } = await client.query(sql, [id]);
		const user = rows[0];

		res.status(200).json(user);
	} catch (error) {
		res.status(400).send(error);
	} finally {
		client.release();
	}
};
