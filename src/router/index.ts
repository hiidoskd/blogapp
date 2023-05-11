import { Router } from 'express';

import users from './users';
import auth from './auth';
import posts from './posts';

const router = Router();

export default (): Router => {
  auth(router);
  users(router);
  posts(router);
  return router;
};
