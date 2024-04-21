import { Transfer } from 'src/transactions/domain/models/transfer.model';

export interface TransferPort {
  create(input: Transfer): Promise<Transfer>;
}
