import { Access } from 'src/auth/domain/models/access.model';

export interface AccessPort {
  createAccess(access: Access): Promise<Access>;
}
