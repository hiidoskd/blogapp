import express from 'express';

import {
  addPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from '../controllers/posts';

export default (router: express.Router) => {
  router.get('/posts', getPosts);
  router.get('/posts/:id', getPost);
  router.post('/posts', addPost);
  router.delete('/posts/:id', deletePost);
  router.put('/posts/:id', updatePost);
};
