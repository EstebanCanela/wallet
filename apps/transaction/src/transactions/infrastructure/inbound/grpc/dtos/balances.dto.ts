export class RetrieveBalanceDto {
  userId: string;
}

export class RetrieveBalanceOutputDto {
  balances: Balances[];
}

export class Balances {
  cbu: string;
  currency: string;
}
