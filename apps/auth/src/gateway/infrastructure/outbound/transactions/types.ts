export interface TransactionService {
  Deposit(data: DepositGrpcDto): Promise<DepositOutputGrpcDto>;
  Transfer(data: TransferGrpcDto): Promise<TransferOutputGrpcDto>;
  Balances(data: BalancesGrpcDto): Promise<BalancesOutputGrpcDto>;
}

export class TransferGrpcDto {
  amount: number;
  cbu: string;
  description: string;
  userId: string;
}

export class TransferOutputGrpcDto {
  status: string;
  type: string;
}

export class BalancesGrpcDto {
  userId: string;
}

export class BalancesOutputGrpcDto {
  balances: Balances[];
}

export class Balances {
  cbu: string;
  currency: string;
}

export class DepositGrpcDto {
  cbu: string;
  amount: number;
  userId: string;
  terminal: string;
}

export class DepositOutputGrpcDto {
  status: string;
  type: string;
}
