import { Router } from 'express';
import { getAllUsers, getUserById } from '../controllers/users';

export default (router: Router) => {
  router.get('/users', getAllUsers);
  router.get('/users/:id', getUserById);
};
