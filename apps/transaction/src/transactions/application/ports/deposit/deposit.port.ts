import { Deposit } from 'src/transactions/domain/models/deposit.model';

export interface DepositPort {
  create(input: Deposit): Promise<void>;
}
