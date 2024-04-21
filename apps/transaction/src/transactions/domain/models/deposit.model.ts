export const DepositStatusApproved = 'APPROVED';
export const DepositStatusRejected = 'REJECTED';

export type DepositStatus =
  | typeof DepositStatusApproved
  | typeof DepositStatusRejected;

export class Deposit {
  id?: string | number;
  amount: number;
  balanceId: number;
  terminal: string | null;
  status: DepositStatus;
  publicId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
