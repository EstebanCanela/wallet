import {
  LoginCommand,
  LoginCommandOutput,
} from 'src/auth/application/commands/login.command';
import { LoginDto, LoginResponseDto } from '../dtos/login.dto';

export function loginMapper(input: LoginDto, ip: string): LoginCommand {
  return {
    email: input.email,
    password: input.password,
    ip,
  };
}

export function loginResponseMapper(
  output: LoginCommandOutput,
): LoginResponseDto {
  return {
    token: output.token,
    expires_in: output.expiresIn,
  };
}
