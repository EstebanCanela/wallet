import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { DepositDto, DepositOutputDto } from '../dtos/deposit.dto';
import DepositUseCase from 'src/transactions/application/usecases/deposit.usecase';
import {
  mapDepositCommandOutputToDto,
  mapDepositDtoToCommand,
} from '../mappers/deposit.mapper';
import RetrieveBalancesUseCase from 'src/transactions/application/usecases/retrieve-balances.usecase';
import {
  RetrieveBalanceDto,
  RetrieveBalanceOutputDto,
} from '../dtos/balances.dto';
import { mapDomainToBalancesResponseDto } from '../mappers/balances.mapper';
import { TransferInputDto, TransferOutputDto } from '../dtos/transfer.dto';
import {
  mapTransferDtoToCommand,
  mapTransferOutputCommandToDto,
} from '../mappers/transfer.mapper';
import TransferUseCase from 'src/transactions/application/usecases/transfer.usecase';

@Controller()
export class TransactionsController {
  constructor(
    private readonly depositUseCase: DepositUseCase,
    private readonly retrieveBalancesUseCase: RetrieveBalancesUseCase,
    private readonly transferUseCase: TransferUseCase,
  ) {}

  @GrpcMethod('TransactionService', 'Deposit')
  async deposit(data: DepositDto): Promise<DepositOutputDto> {
    const depositInput = mapDepositDtoToCommand(data);
    const result = await this.depositUseCase.execute(depositInput);
    return mapDepositCommandOutputToDto(result);
  }

  @GrpcMethod('TransactionService', 'Balances')
  async balances(data: RetrieveBalanceDto): Promise<RetrieveBalanceOutputDto> {
    const result = await this.retrieveBalancesUseCase.execute(data.userId);
    return mapDomainToBalancesResponseDto(result);
  }

  @GrpcMethod('TransactionService', 'Transfer')
  async transfer(data: TransferInputDto): Promise<TransferOutputDto> {
    const input = mapTransferDtoToCommand(data);
    const result = await this.transferUseCase.execute(input);
    return mapTransferOutputCommandToDto(result);
  }
}
