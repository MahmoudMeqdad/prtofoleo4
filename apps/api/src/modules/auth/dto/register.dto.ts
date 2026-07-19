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
  ValidateIf,
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

  @ApiProperty({ example: "9665XXXXXXXX" })
  @IsString()
  @Matches(/^\d{7,15}$/, {
    message: "phone must contain 7-15 digits only (international format)",
  })
  phone!: string;

  @ApiProperty({ minLength: 8, example: "S3curePass1" })
  @IsString()
  @MinLength(8)
  @MaxLength(128)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d).+$/, {
    message: "password must contain at least one letter and one number",
  })
  password!: string;

  @ApiProperty({ enum: SELF_REGISTER_ROLES, example: "CUSTOMER" })
  @IsIn(SELF_REGISTER_ROLES)
  role!: SelfRegisterRole;

  // --- Marketer fields ---
  @ApiPropertyOptional()
  @ValidateIf((o: RegisterDto) => o.role === "MARKETER")
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  whatsappNumber?: string;

  @ApiPropertyOptional()
  @ValidateIf((o: RegisterDto) => o.role === "MARKETER")
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  city?: string;

  @ApiPropertyOptional()
  @ValidateIf((o: RegisterDto) => o.role === "MARKETER")
  @IsString()
  @IsNotEmpty()
  @MaxLength(160)
  businessOrPageName?: string;

  @ApiPropertyOptional()
  @ValidateIf((o: RegisterDto) => o.role === "MARKETER")
  @IsOptional()
  @IsString()
  @MaxLength(255)
  facebookPage?: string;

  @ApiPropertyOptional()
  @ValidateIf((o: RegisterDto) => o.role === "MARKETER")
  @IsOptional()
  @IsString()
  @MaxLength(255)
  instagramPage?: string;

  @ApiPropertyOptional()
  @ValidateIf((o: RegisterDto) => o.role === "MARKETER")
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  marketingMethod?: string;

  // --- Wholesale trader fields ---
  @ApiPropertyOptional()
  @ValidateIf((o: RegisterDto) => o.role === "WHOLESALE_TRADER")
  @IsString()
  @IsNotEmpty()
  @MaxLength(160)
  businessName?: string;

  @ApiPropertyOptional()
  @ValidateIf((o: RegisterDto) => o.role === "WHOLESALE_TRADER")
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  businessType?: string;

  @ApiPropertyOptional()
  @ValidateIf((o: RegisterDto) => o.role === "WHOLESALE_TRADER")
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  wholesaleCity?: string;

  @ApiPropertyOptional()
  @ValidateIf((o: RegisterDto) => o.role === "WHOLESALE_TRADER")
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  address?: string;

  @ApiPropertyOptional()
  @ValidateIf((o: RegisterDto) => o.role === "WHOLESALE_TRADER")
  @IsOptional()
  @IsString()
  @MaxLength(120)
  expectedOrderVolume?: string;
}
