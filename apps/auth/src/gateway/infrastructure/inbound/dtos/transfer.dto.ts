import { IsNumber, IsString, MaxLength } from 'class-validator';

export class TransferDto {
  @IsNumber()
  amount: number;

  @IsString()
  cbu: string;

  @IsString()
  @MaxLength(20)
  description: string;
}

export class TransferResponseDto {
  status: string;
  type: string;
}
