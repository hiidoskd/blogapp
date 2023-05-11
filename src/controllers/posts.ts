import { Response, Request } from 'express';
import jwt from 'jsonwebtoken';

import { pool } from '../db';
import { error } from 'console';

export const getPosts = async (req: Request, res: Response) => {
  try {
    const page: number = +req.query.page || 1;
    const itemsPerPage: number = +req.query.items || 20;

    const sql = `SELECT posts.id, title, description, img, date, uid, username as author
                  FROM posts JOIN users ON users.id = posts.uid 
                  LIMIT ${itemsPerPage} OFFSET ${(page - 1) * itemsPerPage}`;

    const client = await pool.connect();
    const result = await client.query(sql);
    client.release();

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getPost = async (req: Request, res: Response) => {
  try {
    const sql =
      'SELECT posts.id, title, description, img, date, uid, username FROM posts JOIN users ON users.id = posts.uid WHERE posts.id = $1';

    const client = await pool.connect();
    const result = await client.query(sql, [req.params.id]);
    client.release();

    if (result.rowCount == 0) {
      return res.sendStatus(404);
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const addPost = async (req: Request, res: Response) => {
  const token = req.cookies.access_token;
  console.log(token);
  if (!token) {
    return res.status(401).json('Not authorized');
  }
  try {
    const sql = `INSERT INTO posts (title, description, img, date, uid) VALUES ($1, $2, $3, to_timestamp(${Date.now()} / 1000.0), $4)`;
    const userInfo = jwt.verify(token, 'secretkey');

    const client = await pool.connect();
    await client.query(sql, [
      req.body.title,
      req.body.description,
      req.body.img,
      JSON.parse(JSON.stringify(userInfo)).id,
    ]);
    client.release();

    res.status(200).json('Post added successfully');
  } catch (error) {
    res.status(400).json(error);
  }
};

export const deletePost = async (req: Request, res: Response) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json('Not authorized');
  }
  try {
    const userInfo = jwt.verify(token, 'secretkey');
    const sql = 'DELETE FROM posts WHERE id = $1 AND uid = $2';

    const client = await pool.connect();

    await client.query(sql, [
      req.params.id,
      JSON.parse(JSON.stringify(userInfo)).id,
    ]);

    client.release();
    res.status(200).json('Deleted post');
  } catch (error) {
    return res.status(403).json(error);
  }
};

export const updatePost = async (req: Request, res: Response) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json('Not authorized');
  }
  try {
    const userInfo = jwt.verify(token, 'secretkey');
    const uid = JSON.parse(JSON.stringify(userInfo)).id;
    const select = 'SELECT * from posts WHERE id = $1';

    let client = await pool.connect();
    let result = await client.query(select, [req.params.id]);
    client.release();
    console.log(uid, result.rows[0]);
    if (result.rows[0].uid != uid) {
      return res.status(403).json(error);
    }

    const sql = `UPDATE posts SET title=$1, description=$2, img=$3, date=to_timestamp(${Date.now()} / 1000.0) WHERE id = $4 AND uid = $5`;

    client = await pool.connect();

    await client.query(sql, [
      req.body.title,
      req.body.description,
      req.body.img,
      req.params.id,
      JSON.parse(JSON.stringify(userInfo)).id,
    ]);

    client.release();
    res.status(200).json('Updated post');
  } catch (error) {
    return res.status(400).json(error);
  }
};
