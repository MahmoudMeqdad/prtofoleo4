import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
  @ApiProperty({ example: "aisha@example.com" })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: "S3cure-Passw0rd" })
  @IsString()
  @IsNotEmpty()
  password!: string;
}
