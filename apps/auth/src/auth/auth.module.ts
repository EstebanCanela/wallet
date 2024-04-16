import { Module } from '@nestjs/common';
import { AuthController } from './infrastructure/inbound/rest/controllers/auth.controller';
import UserAdapter from './infrastructure/outbound/adapters/users.adapter';
import CreateUserUseCase from './application/usecases/create-user.usecase';
import LoginUseCase from './application/usecases/login.usecase';
import AccessAdapter from './infrastructure/outbound/adapters/access.adapter';
import { CommonModule } from 'src/common/common.module';
import AccountsAdapter from './infrastructure/outbound/adapters/accounts.adapter';

@Module({
  imports: [CommonModule],
  controllers: [AuthController],
  providers: [
    UserAdapter,
    CreateUserUseCase,
    LoginUseCase,
    AccessAdapter,
    AccountsAdapter,
  ],
})
export class AuthModule {}
