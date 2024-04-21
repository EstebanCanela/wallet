import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { TransactionService } from './types';
import {
  TransferDto,
  TransferResponseDto,
} from '../../inbound/dtos/transfer.dto';
import { BalancesResponseDto } from '../../inbound/dtos/balances.dto';
import { DepositDto, DepositResponseDto } from '../../inbound/dtos/deposit.dto';

@Injectable()
export class TransactionsAdapter implements OnModuleInit {
  private transactionService: TransactionService;

  constructor(@Inject('TRANSACTIONS_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.transactionService =
      this.client.getService<TransactionService>('TransactionService');
  }

  deposit(
    data: DepositDto,
    userId: string,
    ip: string,
  ): Promise<DepositResponseDto> {
    const depositData = {
      ...data,
      userId,
      terminal: ip,
    };
    return this.transactionService.Deposit(depositData);
  }

  transfer(data: TransferDto, userId: string): Promise<TransferResponseDto> {
    const transferData = {
      ...data,
      userId,
    };
    return this.transactionService.Transfer(transferData);
  }

  balances(userId: string): Promise<BalancesResponseDto> {
    const data = {
      userId,
    };
    return this.transactionService.Balances(data);
  }
}
