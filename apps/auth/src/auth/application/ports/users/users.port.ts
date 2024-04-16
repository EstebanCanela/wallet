import { User } from 'src/auth/domain/models/user.model';

export interface UsersPort {
  createUser(user: User): Promise<User>;
  getUserByEmail(email: string): Promise<User>;
}
