export default () => ({
  port: process.env.PORT || 3003,
  sql: {
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'deposit',
    // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
  },
  sqs: {
    region: process.env.SQS_REGION || 'us-east-1',
    apiVersion: '2012-11-05',
    bankQueueUrl:
      process.env.SQS_BANK_QUEUE_URL ||
      'http://localhost:4566/000000000000/sqs-bank-account',
  },
  security: {
    secret: process.env.SECURITY_PRIVATE_KEY || 'private_key',
    signOptions: {
      expiresIn: process.env.SECURITY_EXPIRES_IN || '600s',
    },
  },
});
