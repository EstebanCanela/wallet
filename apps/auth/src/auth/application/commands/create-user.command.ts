export class CreateUserCommand {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  identificationType: string;
  identificationNumber: string;
  ip: string;
}

export class CreateUserCommandOutput {
  token: string;
  expiresIn: number;
  userId: string;
}
