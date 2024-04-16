export const AccountTypeUsd = 'USD';
export const AccountTypeArs = 'ARS';

export type AccountType = typeof AccountTypeUsd | typeof AccountTypeArs;

export class Account {
  userId: string;
  type: AccountType;
}
