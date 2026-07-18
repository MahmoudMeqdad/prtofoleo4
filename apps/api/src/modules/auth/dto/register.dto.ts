import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";

/**
 * Roles a visitor may self-register as. Staff and admin accounts
 * are provisioned internally, never through public registration.
 */
export const SELF_REGISTER_ROLES = [
  "CUSTOMER",
  "MARKETER",
  "WHOLESALE_TRADER",
] as const;

export type SelfRegisterRole = (typeof SELF_REGISTER_ROLES)[number];

export class RegisterDto {
  @ApiProperty({ example: "Aisha Hassan" })
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  name!: string;

  @ApiProperty({ example: "aisha@example.com" })
  @IsEmail()
  @MaxLength(254)
  email!: string;

  @ApiPropertyOptional({ example: "9665XXXXXXXX" })
  @IsOptional()
  @IsString()
  @Matches(/^\d{7,15}$/, {
    message: "phone must contain 7-15 digits only (international format)",
  })
  phone?: string;

  @ApiProperty({ minLength: 8, example: "S3cure-Passw0rd" })
  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password!: string;

  @ApiProperty({ enum: SELF_REGISTER_ROLES, example: "CUSTOMER" })
  @IsIn(SELF_REGISTER_ROLES)
  role!: SelfRegisterRole;
}
