import { Module } from '@nestjs/common';
import { TransactionsController } from './infrastructure/inbound/rest/controllers/transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BalanceService } from './infrastructure/outbound/adapters/balance/adapter';
import { Balance } from './infrastructure/outbound/adapters/balance/entity';

@Module({
  imports: [TypeOrmModule.forFeature([Balance])],
  controllers: [TransactionsController],
  providers: [BalanceService],
})
export class TransactionsModule {}
