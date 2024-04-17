import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('v1/transactions')
export class TransactionsController {
  constructor() {} // private readonly createUserUseCase: CreateUserUseCase,

  @Get('profile')
  getProfile(@Req() req: Request) {
    return req.user;
  }
}
