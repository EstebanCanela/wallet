import { IsNumber, IsString } from 'class-validator';

export class DepositDto {
  @IsNumber()
  amount: number;

  @IsString()
  cbu: string;
}

export class DepositResponseDto {
  status: string;
  type: string;
}
