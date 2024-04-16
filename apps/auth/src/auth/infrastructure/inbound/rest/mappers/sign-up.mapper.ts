import {
  CreateUserCommand,
  CreateUserCommandOutput,
} from 'src/auth/application/commands/create-user.command';
import { SignUpDto, SignUpResponseDto } from '../dtos/sign-up.dto';

export function signUpMapper(body: SignUpDto, ip: string): CreateUserCommand {
  return {
    email: body.email,
    password: body.password,
    firstName: body.first_name,
    lastName: body.last_name,
    phone: body.phone,
    identificationType: body.identification_type,
    identificationNumber: body.identification_number,
    ip,
  };
}

export function signUpResponseMapper(
  commandResult: CreateUserCommandOutput,
): SignUpResponseDto {
  return {
    token: commandResult.token,
    expires_in: commandResult.expiresIn,
    user_id: commandResult.userId,
  };
}
