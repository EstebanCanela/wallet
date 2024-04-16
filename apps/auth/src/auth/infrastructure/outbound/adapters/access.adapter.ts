import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { AccessPort } from 'src/auth/application/ports/access/access.port';
import { Access } from 'src/auth/domain/models/access.model';
import DynamoDbClient from 'src/common/infrastructure/dynamo/client';
import { ConfigService } from '@nestjs/config';

const PREFIX_ACCESS = 'ACCESS#';

@Injectable()
export default class AccessAdapter implements AccessPort {
  constructor(
    private readonly dynamoClient: DynamoDbClient,
    private configService: ConfigService,
  ) {}

  async createAccess(access: Access): Promise<Access> {
    const id = uuid();
    await this.dynamoClient.put({
      TableName: this.configService.get('dynamo.tableName'),
      Item: {
        email: access.email,
        access: `${PREFIX_ACCESS}${id}`,
        createdAt: access.createdAt.toISOString(),
        token: access.token,
        userId: access.userId,
        ip: access.ip,
        status: access.status,
        accessId: id,
      },
    });
    return {
      ...access,
      id,
    };
  }
}
