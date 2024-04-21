import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TransactionsAdapter } from './infrastructure/outbound/transactions/adapter';
import { GatewayController } from './infrastructure/inbound/controllers/gateway.controller';
import config from 'config/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: config().transfer.name,
        transport: Transport.GRPC,
        options: {
          ...config().transfer.options,
        },
      },
    ]),
  ],
  controllers: [GatewayController],
  providers: [TransactionsAdapter],
  exports: [],
})
export class GatewayModule {}
