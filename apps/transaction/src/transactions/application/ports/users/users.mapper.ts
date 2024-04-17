import { User } from 'src/transactions/domain/models/user.model';
import { CreateUserCommand } from '../../commands/create-user.command';

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
