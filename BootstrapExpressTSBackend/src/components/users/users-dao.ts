import { User } from './users-types';

const users: User[] = [];

let id = 0;

class UserDAO {
  public async create(username: string, email: string): Promise<User> {
    const user: User = {
      id: id++,
      username: username,
      email: email
    };

    users.push(user);

    return Promise.resolve(user);
  }

  public async find(id: number): Promise<User | undefined> {
    return Promise.resolve(users.find((t) => t.id === id));
  }

  public async update(
    id: number,
    username: string,
    email: string
  ): Promise<User | undefined> {
    const user = await this.find(id);
    if (!user) {
      return Promise.resolve(undefined);
    }
    user.username = username;
    user.email = email;

    return Promise.resolve(user);
  }

  public async delete(id: number): Promise<boolean> {
    const index = users.findIndex((t) => t.id === id);

    if (index === -1) {
      return Promise.resolve(false);
    }

    users.splice(index, 1);
    return Promise.resolve(true);
  }
}

export const userDAO = new UserDAO();
