import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateUserDto {
  @IsEmail({}, { message: 'El atributo "email" debe ser un email válido.' })
  @IsNotEmpty()
  readonly email: string;

  @IsString({ message: 'El atributo "firstname" debe ser un string.' })
  @IsNotEmpty({ message: 'El atributo "firstname" no debe estar vacío.' })
  @IsOptional()
  readonly firstname?: string;

  @IsString({ message: 'El atributo "password" debe ser un string.' })
  @IsNotEmpty({ message: 'El atributo "password" no debe estar vacío.' })
  @IsOptional()
  readonly password?: string;

  @IsString({ message: 'El atributo "img" debe ser un string.' })
  @IsNotEmpty({ message: 'El atributo "img" no debe estar vacío.' })
  @IsOptional()
  readonly img?: string;

  @IsEnum(['ADMIN_ROLE', 'USER_ROLE', 'TESTER_ROLE'], {
    message:
      'El atributo "role" debe ser de estos tipos "ADMIN_ROLE", "USER_ROLE", "TESTER_ROLE".',
  })
  @IsString({ message: 'El atributo "role" debe ser un string.' })
  @IsNotEmpty({ message: 'El atributo "role" no debe estar vacío.' })
  @IsOptional()
  readonly role?: string;

  @IsBoolean({ message: 'El atributo "google" debe ser un booleano.' })
  @IsOptional()
  readonly google?: boolean;
}
