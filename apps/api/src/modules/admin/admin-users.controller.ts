import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Patch,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AccountStatus, UserRole } from "@prisma/client";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { Roles } from "../auth/decorators/roles.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import type { AuthenticatedUser } from "../auth/auth.types";
import { UsersService } from "../users/users.service";
import { ListUsersQueryDto } from "./dto/list-users-query.dto";
import { UpdateAccountStatusDto } from "./dto/update-account-status.dto";

@ApiTags("Admin / Accounts")
@ApiBearerAuth()
@Controller("admin/users")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
export class AdminUsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({
    summary: "List accounts, filterable by status (e.g. PENDING) and role",
  })
  list(@Query() query: ListUsersQueryDto) {
    return this.usersService.list(query);
  }

  @Patch(":id/status")
  @ApiOperation({ summary: "Approve, reject, or suspend an account" })
  async updateStatus(
    @Param("id") id: string,
    @Body() dto: UpdateAccountStatusDto,
    @CurrentUser() actor: AuthenticatedUser,
  ) {
    if (actor.id === id) {
      throw new ForbiddenException("You cannot change your own status");
    }

    const target = await this.usersService.findById(id);
    if (!target) {
      throw new NotFoundException("Account not found");
    }

    // Only a super admin may act on admin-level accounts.
    const targetIsAdmin =
      target.role === UserRole.ADMIN || target.role === UserRole.SUPER_ADMIN;
    if (targetIsAdmin && actor.role !== UserRole.SUPER_ADMIN) {
      throw new ForbiddenException(
        "Only a super admin can modify admin accounts",
      );
    }

    return this.usersService.updateStatus(id, dto.status as AccountStatus);
  }
}
