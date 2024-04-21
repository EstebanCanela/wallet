import {
  TransferCommand,
  TransferOutputCommand,
} from 'src/transactions/application/commands/transfer.command';
import { TransferInputDto, TransferOutputDto } from '../dtos/transfer.dto';

export function mapTransferDtoToCommand(
  data: TransferInputDto,
): TransferCommand {
  return {
    cbu: data.cbu,
    amount: data.amount,
    description: data.description,
    userId: data.userId,
  };
}

export function mapTransferOutputCommandToDto(
  data: TransferOutputCommand,
): TransferOutputDto {
  return {
    status: data.status,
    type: data.type,
  };
}
