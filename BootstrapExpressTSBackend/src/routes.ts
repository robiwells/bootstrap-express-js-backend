import express from 'express';
import { users } from 'components/users/users-api';

function routes(): express.Router {
  const router = express.Router();
  router.use('/users', users);
  return router;
}

export default routes();
