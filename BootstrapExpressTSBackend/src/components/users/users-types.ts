export interface User {
  id: number;
  username: string;
  email: string;
}

export interface UserDAO {
  create(username: string, email: string): Promise<User>;
  find(id: number): Promise<User | undefined>;
  update(id: number, username: string, email: string): Promise<User | undefined>;
  delete(id: number): Promise<boolean>;
}
