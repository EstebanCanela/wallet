import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import UserAdapter from 'src/auth/infrastructure/outbound/adapters/users.adapter';
import { comparePassword } from 'src/utils/bcrypt';
import { createAccess } from '../ports/access/access.mapper';
import AccessAdapter from 'src/auth/infrastructure/outbound/adapters/access.adapter';
import { LoginCommand, LoginCommandOutput } from '../commands/login.command';
import { JwtService } from '@nestjs/jwt';
import {
  AccessStatusInvalid,
  AccessStatusValid,
} from 'src/auth/domain/models/access.model';

@Injectable()
export default class LoginUseCase {
  constructor(
    private readonly userAdapter: UserAdapter,
    private readonly accessAdapter: AccessAdapter,
    private readonly jwtService: JwtService,
  ) {}

  async execute(input: LoginCommand): Promise<LoginCommandOutput> {
    const user = await this.userAdapter.getUserByEmail(input.email);

    try {
      if (!user) {
        throw new HttpException('User does not exist', HttpStatus.UNAUTHORIZED);
      }

      const passwordMatched = await comparePassword(
        input.password,
        user.password,
      );

      if (!passwordMatched) {
        throw new HttpException(
          'Password does not match',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const jwtPayload = {
        user_id: user.id,
        email: user.email,
      };

      const token = this.jwtService.sign(jwtPayload);

      const accessToCreate = createAccess(
        user,
        input.ip,
        token,
        AccessStatusValid,
      );

      await this.accessAdapter.createAccess(accessToCreate);

      return {
        token,
        expiresIn: 600,
      };
    } catch (error) {
      if (user) {
        const accessToCreate = createAccess(
          user,
          input.ip,
          null,
          AccessStatusInvalid,
        );

        this.accessAdapter.createAccess(accessToCreate);
      }

      throw error;
    }
  }
}
