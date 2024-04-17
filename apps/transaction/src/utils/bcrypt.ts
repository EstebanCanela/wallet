import * as bcrypt from 'bcrypt';

export async function hashPassword(plaintextPassword: string): Promise<string> {
  return bcrypt.hash(plaintextPassword, 10);
}

export async function comparePassword(
  plaintextPassword: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(plaintextPassword, hash);
}
