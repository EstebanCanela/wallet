import { Injectable } from '@nestjs/common';
import { TransferAdapter } from 'src/transactions/infrastructure/outbound/adapters/transfer/adapter';
import {
  TransferCommand,
  TransferOutputCommand,
} from '../commands/transfer.command';
import { BalanceAdapter } from 'src/transactions/infrastructure/outbound/adapters/balance/adapter';
import { Transfer } from 'src/transactions/domain/models/transfer.model';

@Injectable()
export default class TransferUseCase {
  constructor(
    private readonly transferAdapter: TransferAdapter,
    private readonly balanceAdapter: BalanceAdapter,
  ) {}

  async execute(input: TransferCommand): Promise<TransferOutputCommand> {
    const destinationBalance = await this.balanceAdapter.getBalanceBy({
      cbu: input.cbu,
    });

    if (!destinationBalance) {
      return { status: 'error', type: 'balance_not_found' };
    }

    const sourceBalance = await this.balanceAdapter.getBalanceBy({
      userId: input.userId,
      currency: destinationBalance.currency,
    });

    if (!sourceBalance) {
      return { status: 'error', type: 'balance_not_found' };
    }

    if (sourceBalance.currency !== destinationBalance.currency) {
      return { status: 'error', type: 'currency_mismatch' };
    }

    const transfer: Transfer = {
      transferDate: new Date(),
      amount: input.amount,
      currency: destinationBalance.currency,
      sourceCbu: sourceBalance.cbu,
      description: input.description,
      destinationCbu: destinationBalance.cbu,
      sourceBalanceId: sourceBalance.publicId,
      destinationBalanceId: destinationBalance.publicId,
      sourceClientId: sourceBalance.userId,
      destinationClientId: destinationBalance.userId,
    };

    await this.transferAdapter.create(transfer);

    return { status: 'success', type: 'success' };
  }
}
