import { Router } from 'express';
import { login, logout, register } from '../controllers/auth';

export default (router: Router) => {
  router.post('/register', register);
  router.post('/login', login);
  router.post('/logout', logout);
};
