import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/jwt/jwt.guard';
import { TransactionsAdapter } from '../../outbound/transactions/adapter';
import { TransferDto, TransferResponseDto } from '../dtos/transfer.dto';
import { AuthenticatedRequest } from 'src/common/jwt/authenticatedRequest';
import { BalancesResponseDto } from '../dtos/balances.dto';
import { DepositDto, DepositResponseDto } from '../dtos/deposit.dto';
import { CheckRejectedInterceptor } from '../interceptor/error.interceptor';

@Controller('v1/transactions')
@UseInterceptors(CheckRejectedInterceptor)
export class GatewayController {
  constructor(private readonly transactionsAdapter: TransactionsAdapter) {}

  @UseGuards(JwtAuthGuard)
  @Post('transfer')
  async transfer(
    @Body() body: TransferDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<TransferResponseDto> {
    return this.transactionsAdapter.transfer(body, req.user?.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('balances')
  async balances(
    @Req() req: AuthenticatedRequest,
  ): Promise<BalancesResponseDto> {
    return this.transactionsAdapter.balances(req.user?.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('deposit')
  async deposit(
    @Body() body: DepositDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<DepositResponseDto> {
    const terminalIp = req.headers['x-forwarded-for'] || req.ip;
    return this.transactionsAdapter.deposit(
      body,
      req.user?.userId,
      terminalIp as string,
    );
  }
}
