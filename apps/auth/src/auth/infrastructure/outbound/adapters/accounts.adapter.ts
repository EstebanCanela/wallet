import { Injectable } from '@nestjs/common';
import { AccountsPort } from 'src/auth/application/ports/accounts/account.port';
import SqsClient from 'src/common/infrastructure/sqs/client';
import { Account } from 'src/auth/domain/models/account.model';

@Injectable()
export default class AccountsAdapter implements AccountsPort {
  constructor(private readonly sqsClient: SqsClient) {}

  createAccount(accounts: Account[]): Promise<void> {
    const message = JSON.stringify(accounts);
    return this.sqsClient.send(message);
  }
}
