import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export enum IdentificationEnum {
  DNI = 'DNI',
  CI = 'CI',
  LE = 'LE',
  LC = 'LC',
}

export class SignUpDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsStrongPassword()
  @MaxLength(20)
  @Matches(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/,
    {
      message: 'Password is too weak.',
    },
  )
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  first_name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  last_name: string;

  @IsPhoneNumber('AR')
  phone: string;

  @IsNotEmpty()
  @IsEnum(IdentificationEnum)
  identification_type: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  identification_number: string;
}

export class SignUpResponseDto {
  token: string;
  expires_in: number;
  user_id: string;
}
