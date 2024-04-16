import { CreateUserCommand } from 'src/auth/application/commands/create-user.command';
import { User } from 'src/auth/domain/models/user.model';

export function mapUserCommandToUserDomain(
  userCommand: CreateUserCommand,
): User {
  return {
    email: userCommand.email,
    password: userCommand.password,
    firstName: userCommand.firstName,
    lastName: userCommand.lastName,
    phone: userCommand.phone,
    identificationType: userCommand.identificationType,
    identificationNumber: userCommand.identificationNumber,
  };
}
