import { Injectable } from '@nestjs/common';
import {
  DepositCommand,
  DepositCommandOutput,
} from '../commands/deposit.command';
import { BalanceAdapter } from 'src/transactions/infrastructure/outbound/adapters/balance/adapter';
import { DepositAdapter } from 'src/transactions/infrastructure/outbound/adapters/deposit/adapter';
import {
  Deposit,
  DepositStatusApproved,
  DepositStatusRejected,
} from 'src/transactions/domain/models/deposit.model';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class DepositUseCase {
  constructor(
    private readonly balanceAdapter: BalanceAdapter,
    private readonly depositAdapter: DepositAdapter,
    private configService: ConfigService,
  ) {}

  async execute(input: DepositCommand): Promise<DepositCommandOutput> {
    const balance = await this.balanceAdapter.getBalanceBy({
      cbu: input.cbu,
      userId: input.userId,
    });

    if (!balance) {
      return { status: 'error', type: 'balance_not_found' };
    }

    const terminalId = this.configService.get<string>('terminal.id');

    const deposit: Deposit = {
      amount: Number(input.amount),
      balanceId: balance.id,
      terminal: input.terminal,
      status: DepositStatusApproved,
    };

    const response = {
      status: 'success',
      type: 'success',
    };

    if (input.terminal !== terminalId) {
      deposit.status = DepositStatusRejected;
      response.status = 'error';
      response.type = 'unauthorized_terminal';
    }

    this.depositAdapter.create(deposit);

    return response;
  }
}
