import {
  DepositCommand,
  DepositCommandOutput,
} from 'src/transactions/application/commands/deposit.command';
import { DepositDto, DepositOutputDto } from '../dtos/deposit.dto';

export function mapDepositDtoToCommand(dto: DepositDto): DepositCommand {
  return {
    cbu: dto.cbu,
    amount: dto.amount,
    userId: dto.userId,
    terminal: dto.terminal,
  };
}

export function mapDepositCommandOutputToDto(
  commandOutput: DepositCommandOutput,
): DepositOutputDto {
  return {
    status: commandOutput.status,
    type: commandOutput.type,
  };
}
