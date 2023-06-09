import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { pool } from '../db';

export const register = async (req: Request, res: Response) => {
	const client = await pool.connect();
	try {
		const { username, email, password } = req.body;

		if (!email || !password || !username) {
			return res.sendStatus(400);
		}
		// check if user already exists
		const sql = 'SELECT * from users WHERE email = $1 OR username = $2';
		const result = await client.query(sql, [email, username]);
		console.log(email, username);
		if (result.rowCount) {
			return res.sendStatus(409);
		}
		// hashing the password
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(password, salt);

		const query = 'INSERT INTO users (username, email, password) VALUES ($1,$2,$3)';
		await client.query(query, [username, email, hash]);

		res.status(200).json({ email, username });
	} catch (error) {
		console.log(error);
		res.status(400).send(error);
	} finally {
		client.release();
	}
};

export const login = async (req: Request, res: Response) => {
	const client = await pool.connect();
	try {
		const { username, password } = req.body;
		const sql = 'SELECT * from users WHERE username = $1';
		const result = await client.query(sql, [username]);

		if (result.rowCount == 0) {
			return res.status(404);
		}

		const passwordsMatch = bcrypt.compareSync(password, result.rows[0].password);

		if (!passwordsMatch) {
			return res.status(400).json('Incorrect password or username');
		}
		const { password: hash, ...other } = result.rows[0];
		const token = jwt.sign({ id: result.rows[0].id }, 'secretkey');
		res.cookie('access_token', token, { httpOnly: true }).status(200).json(other);
	} catch (error) {
		console.log(error);
		res.status(400).send(error);
	} finally {
		client.release();
	}
};

export const logout = async (req: Request, res: Response) => {
	try {
		res
			.clearCookie('access_token', {
				sameSite: 'none',
				secure: true,
			})
			.status(200)
			.json('Logged out');
	} catch (error) {
		res.status(400).send(error);
	}
};
