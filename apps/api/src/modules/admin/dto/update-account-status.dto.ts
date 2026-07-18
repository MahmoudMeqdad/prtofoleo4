import { ApiProperty } from "@nestjs/swagger";
import { IsIn } from "class-validator";

/** PENDING is the initial state only; admins move accounts out of it. */
export const REVIEW_STATUSES = ["APPROVED", "REJECTED", "SUSPENDED"] as const;

export type ReviewStatus = (typeof REVIEW_STATUSES)[number];

export class UpdateAccountStatusDto {
  @ApiProperty({ enum: REVIEW_STATUSES, example: "APPROVED" })
  @IsIn(REVIEW_STATUSES)
  status!: ReviewStatus;
}
