import { Router } from 'express';
import { body } from 'express-validator';
import { validationHandler } from 'libs/middleware';
import { addUser, deleteUser, getUser, updateUser } from './users-service';

const router = Router();

router.post(
  '/',
  body('username').notEmpty().withMessage('username is required'),
  body('email').notEmpty().withMessage('email is requied'),
  validationHandler,
  addUser
);

router.get('/:id', getUser);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

export { router as users };
