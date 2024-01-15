import { Request, Response } from 'express';
import { errorhandler } from 'libs/error-handler';
import { userDAO } from './users-dao';

export const addUser = async (req: Request, res: Response) => {
  const user = await userDAO.create(req.body.username, req.body.email);
  res.status(201).json(user);
};

export const getUser = async (req: Request, res: Response) => {
  const user = await userDAO.find(parseInt(req.params.id));
  console.log(user);

  if (!user) {
    return errorhandler.handle(new Error('User not found'), res);
  }

  res.json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const user = await userDAO.update(
    parseInt(req.params.id),
    req.body.username,
    req.body.email
  );

  if (!user) {
    return errorhandler.handle(new Error('User not found'), res);
  }

  res.json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
  const deleted = await userDAO.delete(parseInt(req.params.id));

  if (!deleted) {
    return errorhandler.handle(new Error('User not found'), res);
  }

  res.status(204).send();
};
