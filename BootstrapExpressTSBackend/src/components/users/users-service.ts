import { Request, Response } from 'express';
import { errorhandler } from 'libs/error-handler';
import { UserDAO } from './users-types';
import { DefaultUserDAO } from './users-dao';

export class UsersService {
  readonly userDAO: UserDAO;

  constructor(userDAO: UserDAO) {
    this.userDAO = userDAO;
  }

  public async addUser(username: string, email: string) {
    return await this.userDAO.create(username, email);
  }

  public async getUser(id: number) {
    return await this.userDAO.find(id);
  }

  public async updateUser(id: number, username: string, email: string) {
    return await this.userDAO.update(id, username, email);
  }

  public async deleteUser(id: number) {
    return await this.userDAO.delete(id);
  }
}

const userService = new UsersService(new DefaultUserDAO());

export const addUser = async (req: Request, res: Response) => {
  const user = await userService.addUser(req.body.username, req.body.email);
  res.status(201).json(user);
};

export const getUser = async (req: Request, res: Response) => {
  const user = await userService.getUser(parseInt(req.params.id));

  if (!user) {
    return errorhandler.handle(new Error('User not found'), res);
  }

  res.json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const user = await userService.updateUser(
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
  const deleted = await userService.deleteUser(parseInt(req.params.id));

  if (!deleted) {
    return errorhandler.handle(new Error('User not found'), res);
  }

  res.status(204).send();
};
