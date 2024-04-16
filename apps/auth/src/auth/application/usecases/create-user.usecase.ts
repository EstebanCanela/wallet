import { Injectable } from '@nestjs/common';
import {
  CreateUserCommand,
  CreateUserCommandOutput,
} from '../commands/create-user.command';
import UserAdapter from 'src/auth/infrastructure/outbound/adapters/users.adapter';
import { hashPassword } from 'src/utils/bcrypt';
import { mapUserCommandToUserDomain } from '../ports/users/users.mapper';
import { createAccess } from '../ports/access/access.mapper';
import AccessAdapter from 'src/auth/infrastructure/outbound/adapters/access.adapter';
import { JwtService } from '@nestjs/jwt';
import { AccessStatusValid } from 'src/auth/domain/models/access.model';
import AccountsAdapter from 'src/auth/infrastructure/outbound/adapters/accounts.adapter';
import {
  AccountTypeArs,
  AccountTypeUsd,
} from 'src/auth/domain/models/account.model';

@Injectable()
export default class CreateUserUseCase {
  constructor(
    private readonly userAdapter: UserAdapter,
    private readonly accessAdapter: AccessAdapter,
    private readonly jwtService: JwtService,
    private readonly accountsAdapter: AccountsAdapter,
  ) {}

  async execute(input: CreateUserCommand): Promise<CreateUserCommandOutput> {
    const user = await this.userAdapter.getUserByEmail(input.email);

    if (user) {
      throw new Error('User already exists');
    }

    const userToCreate = mapUserCommandToUserDomain(input);
    const hashedPassword = await hashPassword(input.password);

    const userCreated = await this.userAdapter.createUser({
      ...userToCreate,
      password: hashedPassword,
    });

    const jwtPayload = {
      user_id: userCreated.id,
      email: userCreated.email,
    };

    const token = this.jwtService.sign(jwtPayload);

    const accessToCreate = createAccess(
      userCreated,
      input.ip,
      token,
      AccessStatusValid,
    );

    Promise.all([
      this.accessAdapter.createAccess(accessToCreate),
      this.accountsAdapter.createAccount([
        {
          userId: userCreated.id,
          type: AccountTypeUsd,
        },
        {
          userId: userCreated.id,
          type: AccountTypeArs,
        },
      ]),
    ]);

    return {
      token,
      expiresIn: 600,
      userId: userCreated.id,
    };
  }
}
