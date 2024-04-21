import * as domain from '../../../../domain/models/deposit.model';
import * as entity from './entity';

export function mapDomainToEntity(
  deposit: domain.Deposit,
): Partial<entity.Deposit> {
  return {
    amount: deposit.amount,
    terminal: deposit.terminal,
    status: deposit.status,
  };
}
