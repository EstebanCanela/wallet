import { Module } from '@nestjs/common';
import config from 'config/config';
import { ConfigModule } from '@nestjs/config';
// import { CommonModule } from './common/common.module';
import { TransactionsModule } from './transactions/transactions.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Balance } from './transactions/infrastructure/outbound/adapters/balance/entity';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRoot({
      ...config().sql,
      type: 'mysql',
      entities: [Balance],
    }),
    TransactionsModule,
    // CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
