import { Access, AccessStatus } from 'src/auth/domain/models/access.model';
import { User } from 'src/auth/domain/models/user.model';

export function createAccess(
  user: User,
  ip: string,
  token: string | null,
  status: AccessStatus,
): Access {
  return {
    ip,
    email: user.email,
    createdAt: new Date(),
    token,
    userId: user.id,
    status,
  };
}
