import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BalanceAdapter } from './infrastructure/outbound/adapters/balance/adapter';
import { Balance } from './infrastructure/outbound/adapters/balance/entity';
import { Deposit } from './infrastructure/outbound/adapters/deposit/entity';
import { TransactionsController } from './infrastructure/inbound/grpc/controllers/transactions.controller';
import DepositUseCase from './application/usecases/deposit.usecase';
import { DepositAdapter } from './infrastructure/outbound/adapters/deposit/adapter';
import { CreateBalanceHandler } from './infrastructure/inbound/async/create-balance.handler';
import CreateBalanceUseCase from './application/usecases/create-balance.usecase';
import RetrieveBalancesUseCase from './application/usecases/retrieve-balances.usecase';
import { TransferAdapter } from './infrastructure/outbound/adapters/transfer/adapter';
import { Transfer } from './infrastructure/outbound/adapters/transfer/entity';
import TransferUseCase from './application/usecases/transfer.usecase';

@Module({
  imports: [
    TypeOrmModule.forFeature([Balance, Deposit]),
    TypeOrmModule.forFeature([Transfer], 'transferConnection'),
  ],
  controllers: [TransactionsController],
  providers: [
    BalanceAdapter,
    DepositUseCase,
    DepositAdapter,
    CreateBalanceHandler,
    CreateBalanceUseCase,
    RetrieveBalancesUseCase,
    TransferAdapter,
    TransferUseCase,
  ],
})
export class TransactionsModule {}
