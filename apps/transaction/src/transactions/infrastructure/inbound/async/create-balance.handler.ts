import { Injectable } from '@nestjs/common';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';
import * as AWS from 'aws-sdk';
import config from 'config/config';
import { CreateBalance } from './create-balance.dto';
import CreateBalanceUseCase from 'src/transactions/application/usecases/create-balance.usecase';

@Injectable()
export class CreateBalanceHandler {
  constructor(private readonly createBalanceUseCase: CreateBalanceUseCase) {}

  @SqsMessageHandler(config().sqs.name, false)
  async handleMessage(message: AWS.SQS.Message) {
    const balancesToCreate = JSON.parse(message.Body) as CreateBalance[];
    await this.createBalanceUseCase.execute({ balances: balancesToCreate });
  }
}
