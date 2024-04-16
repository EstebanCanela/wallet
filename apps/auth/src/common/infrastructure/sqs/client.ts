import * as AWS from '@aws-sdk/client-sqs';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class SqsClient {
  private client: AWS.SQS;
  private queueUrl: string;

  constructor(private configService: ConfigService) {
    this.client = new AWS.SQS({
      region: this.configService.get('sqs.region'),
      apiVersion: this.configService.get('sqs.apiVersion'),
    });
    this.queueUrl = this.configService.get('sqs.bankQueueUrl');
  }

  async send(message: string): Promise<void> {
    await this.client.sendMessage({
      QueueUrl: this.queueUrl,
      MessageBody: message,
    });
    return;
  }
}
