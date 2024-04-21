export class DepositCommand {
  cbu: string;
  amount: string;
  userId: string;
  terminal: string;
}

export class DepositCommandOutput {
  status: string;
  type: string;
}
