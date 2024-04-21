import * as domain from 'src/transactions/domain/models/transfer.model';
import * as entity from './entity';

export function mapEntityToDomain(input: entity.Transfer): domain.Transfer {
  return {
    id: input.id,
    transferDate: input.transferDate,
    amount: input.amount,
    currency: input.currency,
    description: input.description,
    sourceCbu: input.sourceCbu,
    destinationCbu: input.destinationCbu,
    sourceBalanceId: input.sourceBalanceId,
    destinationBalanceId: input.destinationBalanceId,
    sourceClientId: input.sourceClientId,
    destinationClientId: input.destinationClientId,
    createdAt: input.createdAt,
    updatedAt: input.updatedAt,
  };
}
