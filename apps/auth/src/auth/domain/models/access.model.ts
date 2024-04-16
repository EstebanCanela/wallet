export const AccessStatusValid = 'VALID';
export const AccessStatusInvalid = 'INVALID';

export type AccessStatus =
  | typeof AccessStatusValid
  | typeof AccessStatusInvalid;

export class Access {
  ip: string;
  email: string;
  createdAt: Date;
  token: string | null;
  userId: string;
  status: AccessStatus;
  id?: string;
}
