import { Injectable } from '@nestjs/common';
import { UsersPort } from 'src/auth/application/ports/users/users.port';
import { User } from 'src/auth/domain/models/user.model';
import { v4 as uuid } from 'uuid';
import DynamoDbClient from 'src/common/infrastructure/dynamo/client';
import { ConfigService } from '@nestjs/config';

const PREFIX_USER = 'USER#';

@Injectable()
export default class UserAdapter implements UsersPort {
  constructor(
    private readonly dynamoClient: DynamoDbClient,
    private configService: ConfigService,
  ) {}

  async createUser(user: User): Promise<User> {
    const id = uuid();
    await this.dynamoClient.put({
      TableName: this.configService.get('dynamo.tableName'),
      Item: {
        email: user.email,
        access: `${PREFIX_USER}${id}`,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        identificationType: user.identificationType,
        identificationNumber: user.identificationNumber,
        userId: id,
      },
    });
    return {
      ...user,
      id,
    };
  }

  async getUserByEmail(email: string): Promise<User> {
    const getParams = {
      TableName: this.configService.get('dynamo.tableName'),
      KeyConditionExpression: '#pk = :email AND begins_with(#sk, :access)',
      ExpressionAttributeValues: {
        ':email': email,
        ':access': PREFIX_USER,
      },
      ExpressionAttributeNames: {
        '#pk': 'email',
        '#sk': 'access',
      },
    };
    const userQuery = await this.dynamoClient.query(getParams);
    const user = userQuery.Items[0];
    return user
      ? ({
          ...user,
          id: user.userId,
        } as User)
      : null;
  }
}
