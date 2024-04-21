import { join } from 'path';

export default () => ({
  port: process.env.PORT || 3003,
  dynamo: {
    region: process.env.DYNAMO_REGION || 'us-east-1',
    endpoint: process.env.DYNAMO_ENDPOINT || 'http://localhost:4566',
    tableName: 'Auth',
  },
  sqs: {
    region: process.env.SQS_REGION || 'us-east-1',
    apiVersion: '2012-11-05',
    bankQueueUrl:
      process.env.SQS_BANK_QUEUE_URL ||
      'http://localhost:4566/000000000000/sqs-bank-account',
  },
  transfer: {
    name: 'TRANSACTIONS_PACKAGE',
    options: {
      url: process.env.TRANSFER_URL || 'localhost:5000',
      package: 'transactions',
      protoPath: join(
        __dirname,
        '../gateway/infrastructure/outbound/transactions/transactions.proto',
      ),
    },
  },
  security: {
    secret: process.env.SECURITY_PRIVATE_KEY || 'private_key',
    signOptions: {
      expiresIn: process.env.SECURITY_EXPIRES_IN || '600s',
    },
  },
});
