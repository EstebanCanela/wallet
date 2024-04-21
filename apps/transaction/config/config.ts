export default () => ({
  grpc: {
    port: process.env.PORT || 'localhost:5000',
    package: 'transactions',
    path: '../transactions/infrastructure/inbound/grpc/proto/transactions.proto',
  },
  sql: {
    host: process.env.SQL_HOST || 'localhost',
    port: process.env.SQL_PORT ? Number(process.env.SQL_PORT) : 3306,
    username: process.env.SQL_USER || 'root',
    password: process.env.SQL_PASSWORD || 'root',
    database: process.env.SQL_DATABASE || 'deposit',
    synchronize: true,
  },
  mongo: {
    type: 'mongodb',
    host: process.env.MONGO_DB_HOST || 'mongodb-transfer',
    port: process.env.MONGO_DB_PORT ? Number(process.env.MONGO_DB_PORT) : 27017,
    username: process.env.MONGO_DB_USER || 'root',
    password: process.env.MONGO_DB_PASSWORD || 'root',
    database: process.env.MONGO_DB_DATABASE || 'transfer',
    synchronize: true,
  },
  sqs: {
    region: process.env.SQS_REGION || 'us-east-1',
    name: process.env.SQS_NAME || 'sqs-bank-account',
    queueUrl:
      process.env.SQS_BANK_QUEUE_URL ||
      'http://localhost:4566/000000000000/sqs-bank-account',
  },
  terminal: {
    id: '127.127.1.1',
  },
});
