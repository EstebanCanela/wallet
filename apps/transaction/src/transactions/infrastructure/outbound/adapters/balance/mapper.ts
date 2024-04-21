import * as domain from 'src/transactions/domain/models/balance.model';
import * as entity from './entity';

export function mapEntityToDomain(input: entity.Balance): domain.Balance {
  return {
    id: input.id,
    cbu: input.cbu,
    currency: input.currency,
    publicId: input.publicId,
    userId: input.userId,
    createdAt: input.createdAt,
    updatedAt: input.updatedAt,
  };
}
