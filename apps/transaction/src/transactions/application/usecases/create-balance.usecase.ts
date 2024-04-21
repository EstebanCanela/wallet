import { Injectable } from '@nestjs/common';
import { BalanceAdapter } from 'src/transactions/infrastructure/outbound/adapters/balance/adapter';
import { CreateBalanceCommand } from '../commands/create-balance.command';
import { Balance } from 'src/transactions/domain/models/balance.model';
import { generateCbu } from 'src/utils/cbu';

@Injectable()
export default class CreateBalanceUseCase {
  constructor(private readonly balanceAdapter: BalanceAdapter) {}

  async execute(input: CreateBalanceCommand): Promise<void> {
    const balancesToCreate = input.balances.map((balance) => {
      const balanceToCreate: Balance = {
        cbu: generateCbu(),
        currency: balance.type,
        userId: balance.userId,
      };
      return this.balanceAdapter.create(balanceToCreate);
    });

    await Promise.all(balancesToCreate);
  }
}
