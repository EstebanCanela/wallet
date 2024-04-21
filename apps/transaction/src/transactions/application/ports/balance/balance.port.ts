import {
  Balance,
  BalanceOptions,
} from 'src/transactions/domain/models/balance.model';

export interface BalancePort {
  getBalanceBy(options: BalanceOptions): Promise<Balance>;
  create(balance: Balance): Promise<void>;
  findBalancesByUserId(userId: string): Promise<Balance[]>;
}
