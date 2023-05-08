import express from 'express';
import { getAllUsers, getUserById } from '../controllers/users';

export default (router: express.Router) => {
  router.get('/users', getAllUsers);
  router.get('/users/:id', getUserById);
};
