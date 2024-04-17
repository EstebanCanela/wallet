import { User } from 'src/transactions/domain/models/user.model';

export interface UsersPort {
  createUser(user: User): Promise<User>;
  getUserByEmail(email: string): Promise<User>;
}
