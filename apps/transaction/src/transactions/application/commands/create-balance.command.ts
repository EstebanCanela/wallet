export class CreateBalanceCommand {
  balances: BalanceCommand[];
}

export class BalanceCommand {
  userId: string;
  type: string;
}
