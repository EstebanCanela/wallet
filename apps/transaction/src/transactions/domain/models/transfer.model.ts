export class Transfer {
  id?: string;
  transferDate: Date;
  amount: number;
  currency: string;
  sourceCbu: string;
  destinationCbu: string;
  sourceBalanceId: string;
  destinationBalanceId: string;
  sourceClientId: string;
  destinationClientId: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}
