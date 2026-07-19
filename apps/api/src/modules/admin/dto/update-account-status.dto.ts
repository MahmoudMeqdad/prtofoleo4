import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsIn, IsOptional, IsString, MaxLength } from "class-validator";

/** Statuses an admin may set; transitions are validated against current status. */
export const REVIEW_STATUSES = ["APPROVED", "REJECTED", "SUSPENDED"] as const;

export type ReviewStatus = (typeof REVIEW_STATUSES)[number];

export class UpdateAccountStatusDto {
  @ApiProperty({ enum: REVIEW_STATUSES, example: "APPROVED" })
  @IsIn(REVIEW_STATUSES)
  status!: ReviewStatus;

  @ApiPropertyOptional({ maxLength: 500 })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  note?: string;
}
