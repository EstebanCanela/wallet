import { Account } from 'src/auth/domain/models/account.model';

export interface AccountsPort {
  createAccount(accounts: Account[]): Promise<void>;
}
