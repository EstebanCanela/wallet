export class Balance {
  id?: number;
  cbu: string;
  currency: string;
  publicId?: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class BalanceOptions {
  cbu?: string;
  userId?: string;
  currency?: string;
}
