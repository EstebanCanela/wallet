import { Module } from '@nestjs/common';
import config from 'config/config';
import { ConfigModule } from '@nestjs/config';
import { SqsModule } from '@ssut/nestjs-sqs';
import { TransactionsModule } from './transactions/transactions.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Balance } from './transactions/infrastructure/outbound/adapters/balance/entity';
import { DataSource } from 'typeorm';
import { Deposit } from './transactions/infrastructure/outbound/adapters/deposit/entity';
import { Transfer } from './transactions/infrastructure/outbound/adapters/transfer/entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRoot({
      ...config().sql,
      type: 'mysql',
      entities: [Balance, Deposit],
    }),
    TypeOrmModule.forRoot({
      ...config().mongo,
      type: 'mongodb',
      name: 'transferConnection',
      entities: [Transfer],
    }),
    SqsModule.register({
      consumers: [
        {
          ...config().sqs,
        },
      ],
      producers: [],
    }),
    TransactionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
