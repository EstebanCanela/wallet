import { Injectable } from '@nestjs/common';
import { BalanceAdapter } from 'src/transactions/infrastructure/outbound/adapters/balance/adapter';
import { Balance } from 'src/transactions/domain/models/balance.model';

@Injectable()
export default class RetrieveBalancesUseCase {
  constructor(private readonly balanceAdapter: BalanceAdapter) {}

  async execute(userId: string): Promise<Balance[]> {
    return this.balanceAdapter.findBalancesByUserId(userId);
  }
}
