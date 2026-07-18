import { ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AccountStatus, UserRole } from "@prisma/client";
import type { AuthenticatedUser } from "../auth.types";
import { RolesGuard } from "./roles.guard";

function contextWithUser(user: AuthenticatedUser | undefined): ExecutionContext {
  return {
    switchToHttp: () => ({ getRequest: () => ({ user }) }),
    getHandler: () => ({}),
    getClass: () => ({}),
  } as unknown as ExecutionContext;
}

describe("RolesGuard", () => {
  let reflector: Reflector;
  let guard: RolesGuard;

  const approvedAdmin: AuthenticatedUser = {
    id: "admin-1",
    email: "admin@example.com",
    role: UserRole.ADMIN,
    status: AccountStatus.APPROVED,
  };

  beforeEach(() => {
    reflector = new Reflector();
    guard = new RolesGuard(reflector);
  });

  it("allows routes without role metadata", () => {
    jest.spyOn(reflector, "getAllAndOverride").mockReturnValue(undefined);
    expect(guard.canActivate(contextWithUser(undefined))).toBe(true);
  });

  it("allows an approved user with a required role", () => {
    jest
      .spyOn(reflector, "getAllAndOverride")
      .mockReturnValue([UserRole.ADMIN, UserRole.SUPER_ADMIN]);
    expect(guard.canActivate(contextWithUser(approvedAdmin))).toBe(true);
  });

  it("blocks users without the required role", () => {
    jest
      .spyOn(reflector, "getAllAndOverride")
      .mockReturnValue([UserRole.ADMIN]);
    const customer: AuthenticatedUser = {
      ...approvedAdmin,
      role: UserRole.CUSTOMER,
    };
    expect(() => guard.canActivate(contextWithUser(customer))).toThrow(
      ForbiddenException,
    );
  });

  it("blocks unapproved users even with the right role", () => {
    jest
      .spyOn(reflector, "getAllAndOverride")
      .mockReturnValue([UserRole.MARKETER]);
    const pendingMarketer: AuthenticatedUser = {
      id: "m-1",
      email: "m@example.com",
      role: UserRole.MARKETER,
      status: AccountStatus.PENDING,
    };
    expect(() => guard.canActivate(contextWithUser(pendingMarketer))).toThrow(
      ForbiddenException,
    );
  });

  it("blocks unauthenticated requests when roles are required", () => {
    jest
      .spyOn(reflector, "getAllAndOverride")
      .mockReturnValue([UserRole.ADMIN]);
    expect(() => guard.canActivate(contextWithUser(undefined))).toThrow(
      ForbiddenException,
    );
  });
});
