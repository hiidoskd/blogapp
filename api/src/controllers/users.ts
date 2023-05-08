import { pool } from '../db';
import express from 'express';

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const client = await pool.connect();

    const sql = 'SELECT username, email FROM users';
    const { rows } = await client.query(sql);
    const users = rows;

    client.release();

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

export const getUserById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const client = await pool.connect();
    const id = parseInt(req.params.id);

    const sql = 'SELECT * FROM users where id = $1';
    const { rows } = await client.query(sql, [id]);
    const user = rows[0];

    client.release();

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
