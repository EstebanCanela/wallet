export class LoginCommand {
  email: string;
  password: string;
  ip: string;
}

export class LoginCommandOutput {
  token: string;
  expiresIn: number;
}
