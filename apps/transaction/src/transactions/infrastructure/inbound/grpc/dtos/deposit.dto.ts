export class DepositDto {
  cbu: string;
  amount: string;
  userId: string;
  terminal: string;
}

export class DepositOutputDto {
  status: string;
  type: string;
}
