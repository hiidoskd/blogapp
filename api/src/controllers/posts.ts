import { Response, Request } from 'express';
import jwt from 'jsonwebtoken';

import { pool } from '../db';

export const getPosts = async (req: Request, res: Response) => {
  try {
    const sql = 'SELECT * FROM posts';

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
      'SELECT username, title, description, posts.img, date FROM users JOIN posts ON  users.id = posts.uid WHERE  posts.id = $1';

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
    const sql = `UPDATE posts SET title=$1, description=$2, img=$3, date=to_timestamp(${Date.now()} / 1000.0) WHERE id = $4 AND uid = $5`;

    const client = await pool.connect();

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
    return res.status(403).json(error);
  }
};
