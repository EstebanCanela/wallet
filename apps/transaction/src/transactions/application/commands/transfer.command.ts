export class TransferCommand {
  cbu: string;
  amount: number;
  description: string;
  userId: string;
}

export class TransferOutputCommand {
  status: string;
  type: string;
}
