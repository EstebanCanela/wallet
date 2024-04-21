export class TransferInputDto {
  cbu: string;
  amount: number;
  description: string;
  userId: string;
}

export class TransferOutputDto {
  status: string;
  type: string;
}
