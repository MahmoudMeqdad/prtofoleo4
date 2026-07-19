import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from "@nestjs/common";
import { AccountStatus, UserRole } from "@prisma/client";
import type { AuthenticatedUser } from "../auth/auth.types";
import { UsersService } from "../users/users.service";
import { AdminUsersController } from "./admin-users.controller";

const admin: AuthenticatedUser = {
  id: "admin-1",
  email: "admin@example.com",
  role: UserRole.ADMIN,
  status: AccountStatus.APPROVED,
};

const superAdmin: AuthenticatedUser = {
  id: "super-1",
  email: "super@example.com",
  role: UserRole.SUPER_ADMIN,
  status: AccountStatus.APPROVED,
};

function targetUser(
  id: string,
  role: UserRole,
  status: AccountStatus = AccountStatus.PENDING,
) {
  return {
    id,
    name: "Target",
    email: `${id}@example.com`,
    phone: null,
    passwordHash: "hash",
    role,
    status,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

describe("AdminUsersController", () => {
  let usersService: jest.Mocked<
    Pick<
      UsersService,
      "findById" | "updateStatus" | "list" | "isTransitionAllowed"
    >
  >;
  let controller: AdminUsersController;

  beforeEach(() => {
    usersService = {
      findById: jest.fn(),
      updateStatus: jest.fn(),
      list: jest.fn(),
      isTransitionAllowed: jest.fn().mockReturnValue(true),
    };
    controller = new AdminUsersController(
      usersService as unknown as UsersService,
    );
  });

  it("approves a pending marketer", async () => {
    usersService.findById.mockResolvedValue(
      targetUser("m-1", UserRole.MARKETER),
    );
    usersService.updateStatus.mockResolvedValue({
      ...targetUser("m-1", UserRole.MARKETER),
      status: AccountStatus.APPROVED,
    });

    const result = await controller.updateStatus(
      "m-1",
      { status: "APPROVED" },
      admin,
    );

    expect(usersService.updateStatus).toHaveBeenCalledWith(
      "m-1",
      AccountStatus.APPROVED,
      admin.id,
      undefined,
    );
    expect(result.status).toBe(AccountStatus.APPROVED);
  });

  it("rejects a pending marketer", async () => {
    usersService.findById.mockResolvedValue(
      targetUser("m-2", UserRole.MARKETER),
    );
    usersService.updateStatus.mockResolvedValue({
      ...targetUser("m-2", UserRole.MARKETER),
      status: AccountStatus.REJECTED,
    });

    const result = await controller.updateStatus(
      "m-2",
      { status: "REJECTED", note: "Incomplete profile" },
      admin,
    );
    expect(result.status).toBe(AccountStatus.REJECTED);
    expect(usersService.updateStatus).toHaveBeenCalledWith(
      "m-2",
      AccountStatus.REJECTED,
      admin.id,
      "Incomplete profile",
    );
  });

  it("suspends an approved account", async () => {
    usersService.findById.mockResolvedValue(
      targetUser("m-3", UserRole.MARKETER, AccountStatus.APPROVED),
    );
    usersService.updateStatus.mockResolvedValue({
      ...targetUser("m-3", UserRole.MARKETER),
      status: AccountStatus.SUSPENDED,
    });

    const result = await controller.updateStatus(
      "m-3",
      { status: "SUSPENDED" },
      admin,
    );
    expect(result.status).toBe(AccountStatus.SUSPENDED);
  });

  it("reactivates a suspended account", async () => {
    usersService.findById.mockResolvedValue(
      targetUser("m-4", UserRole.MARKETER, AccountStatus.SUSPENDED),
    );
    usersService.isTransitionAllowed.mockReturnValue(true);
    usersService.updateStatus.mockResolvedValue({
      ...targetUser("m-4", UserRole.MARKETER),
      status: AccountStatus.APPROVED,
    });

    const result = await controller.updateStatus(
      "m-4",
      { status: "APPROVED" },
      admin,
    );
    expect(result.status).toBe(AccountStatus.APPROVED);
  });

  it("blocks invalid status transitions", async () => {
    usersService.findById.mockResolvedValue(
      targetUser("m-5", UserRole.MARKETER, AccountStatus.REJECTED),
    );
    usersService.isTransitionAllowed.mockReturnValue(false);

    await expect(
      controller.updateStatus("m-5", { status: "APPROVED" }, admin),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it("blocks self status changes", async () => {
    await expect(
      controller.updateStatus(admin.id, { status: "SUSPENDED" }, admin),
    ).rejects.toBeInstanceOf(ForbiddenException);
  });

  it("404s on unknown accounts", async () => {
    usersService.findById.mockResolvedValue(null);
    await expect(
      controller.updateStatus("ghost", { status: "APPROVED" }, admin),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it("prevents regular admins from modifying admin accounts", async () => {
    usersService.findById.mockResolvedValue(
      targetUser("admin-2", UserRole.ADMIN),
    );
    await expect(
      controller.updateStatus("admin-2", { status: "SUSPENDED" }, admin),
    ).rejects.toBeInstanceOf(ForbiddenException);
  });

  it("lets super admins modify admin accounts", async () => {
    usersService.findById.mockResolvedValue(
      targetUser("admin-2", UserRole.ADMIN, AccountStatus.APPROVED),
    );
    usersService.updateStatus.mockResolvedValue({
      ...targetUser("admin-2", UserRole.ADMIN),
      status: AccountStatus.SUSPENDED,
    });

    const result = await controller.updateStatus(
      "admin-2",
      { status: "SUSPENDED" },
      superAdmin,
    );
    expect(result.status).toBe(AccountStatus.SUSPENDED);
  });
});
