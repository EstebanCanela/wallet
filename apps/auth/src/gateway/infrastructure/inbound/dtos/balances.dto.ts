export class BalancesResponseDto {
  balances: Balances[];
}

export class Balances {
  cbu: string;
  currency: string;
}
