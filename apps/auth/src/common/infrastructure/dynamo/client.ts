import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

@Injectable()
export default class DynamoDbClient {
  private client: DocumentClient;
  constructor(private configService: ConfigService) {
    this.client = new AWS.DynamoDB.DocumentClient({
      ...this.configService.get('dynamo'),
    });
  }

  async put(
    params: DocumentClient.PutItemInput,
  ): Promise<DocumentClient.PutItemOutput> {
    return this.client.put(params).promise();
  }

  async query(
    params: DocumentClient.QueryInput,
  ): Promise<DocumentClient.QueryOutput> {
    return this.client.query(params).promise();
  }
}
