import { ForbiddenException, NotFoundException } from "@nestjs/common";
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

function targetUser(id: string, role: UserRole) {
  return {
    id,
    name: "Target",
    email: `${id}@example.com`,
    phone: null,
    passwordHash: "hash",
    role,
    status: AccountStatus.PENDING,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

describe("AdminUsersController", () => {
  let usersService: jest.Mocked<
    Pick<UsersService, "findById" | "updateStatus" | "list">
  >;
  let controller: AdminUsersController;

  beforeEach(() => {
    usersService = {
      findById: jest.fn(),
      updateStatus: jest.fn(),
      list: jest.fn(),
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
    );
    expect(result.status).toBe(AccountStatus.APPROVED);
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
      targetUser("admin-2", UserRole.ADMIN),
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
