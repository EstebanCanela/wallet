import { Balance } from 'src/transactions/domain/models/balance.model';
import { RetrieveBalanceOutputDto } from '../dtos/balances.dto';

export function mapDomainToBalancesResponseDto(
  balances: Balance[],
): RetrieveBalanceOutputDto {
  return {
    balances: balances.map((balance) => ({
      cbu: balance.cbu,
      currency: balance.currency,
    })),
  };
}
