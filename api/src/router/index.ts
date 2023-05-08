import express from 'express';

import users from './users';
import auth from './auth';
import posts from './posts';

const router = express.Router();

export default (): express.Router => {
  auth(router);
  users(router);
  posts(router);
  return router;
};
