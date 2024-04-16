import { Module } from '@nestjs/common';
import { JwtStrategy } from './jwt/jwt.strategy';
import DynamoDbClient from './infrastructure/dynamo/client';
import SqsClient from './infrastructure/sqs/client';

@Module({
  imports: [],
  controllers: [],
  providers: [JwtStrategy, DynamoDbClient, SqsClient],
  exports: [DynamoDbClient, JwtStrategy, SqsClient],
})
export class CommonModule {}
