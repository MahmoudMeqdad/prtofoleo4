import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, MinLength } from "class-validator";

/**
 * Refresh token may arrive via HttpOnly cookie. The body field remains
 * optional for non-browser clients and tests.
 */
export class RefreshTokenDto {
  @ApiPropertyOptional({ description: "Opaque refresh token (optional when cookie is set)" })
  @IsOptional()
  @IsString()
  @MinLength(1)
  refreshToken?: string;
}
