import { ConflictException, ForbiddenException, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import { AccountStatus, UserRole } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import { PrismaService } from "../../database/prisma.service";
import { UsersService } from "../users/users.service";
import { AuthService } from "./auth.service";

const baseUser = {
  id: "user-1",
  name: "Test User",
  email: "test@example.com",
  phone: null,
  passwordHash: "",
  role: UserRole.CUSTOMER,
  status: AccountStatus.APPROVED,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("AuthService", () => {
  let service: AuthService;
  let usersService: jest.Mocked<
    Pick<UsersService, "findByEmail" | "findById" | "create">
  >;
  let prisma: {
    refreshToken: {
      create: jest.Mock;
      findUnique: jest.Mock;
      update: jest.Mock;
      updateMany: jest.Mock;
    };
  };

  beforeEach(async () => {
    usersService = {
      findByEmail: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
    };
    prisma = {
      refreshToken: {
        create: jest.fn().mockResolvedValue({}),
        findUnique: jest.fn(),
        update: jest.fn().mockResolvedValue({}),
        updateMany: jest.fn().mockResolvedValue({ count: 1 }),
      },
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersService },
        { provide: PrismaService, useValue: prisma },
        { provide: JwtService, useValue: new JwtService({}) },
        {
          provide: ConfigService,
          useValue: {
            get: (key: string) =>
              ({
                JWT_ACCESS_EXPIRES_IN: "15m",
                JWT_REFRESH_EXPIRES_IN: "30d",
              })[key],
            getOrThrow: (key: string) =>
              ({
                JWT_ACCESS_SECRET: "test-access-secret",
                JWT_REFRESH_SECRET: "test-refresh-secret",
              })[key],
          },
        },
      ],
    }).compile();

    service = moduleRef.get(AuthService);
  });

  describe("register", () => {
    it("rejects duplicate emails", async () => {
      usersService.findByEmail.mockResolvedValue({ ...baseUser });

      await expect(
        service.register({
          name: "Dup",
          email: baseUser.email,
          password: "password123",
          role: "CUSTOMER",
        }),
      ).rejects.toBeInstanceOf(ConflictException);
    });

    it("creates customers as APPROVED", async () => {
      usersService.findByEmail.mockResolvedValue(null);
      usersService.create.mockImplementation(async (data) => ({
        ...baseUser,
        ...data,
        phone: data.phone ?? null,
      }));

      const result = await service.register({
        name: "Customer",
        email: "customer@example.com",
        password: "password123",
        role: "CUSTOMER",
      });

      expect(usersService.create).toHaveBeenCalledWith(
        expect.objectContaining({ status: AccountStatus.APPROVED }),
      );
      expect(result.user.status).toBe(AccountStatus.APPROVED);
      expect(result.tokens.accessToken).toBeTruthy();
      expect(result.tokens.refreshToken).toBeTruthy();
      expect(result.user).not.toHaveProperty("passwordHash");
    });

    it("creates marketers and wholesale traders as PENDING", async () => {
      usersService.findByEmail.mockResolvedValue(null);
      usersService.create.mockImplementation(async (data) => ({
        ...baseUser,
        ...data,
        phone: data.phone ?? null,
      }));

      for (const role of ["MARKETER", "WHOLESALE_TRADER"] as const) {
        const result = await service.register({
          name: "Partner",
          email: `${role.toLowerCase()}@example.com`,
          password: "password123",
          role,
        });
        expect(result.user.status).toBe(AccountStatus.PENDING);
      }
    });

    it("hashes the password with bcrypt", async () => {
      usersService.findByEmail.mockResolvedValue(null);
      usersService.create.mockImplementation(async (data) => ({
        ...baseUser,
        ...data,
        phone: data.phone ?? null,
      }));

      await service.register({
        name: "Hash",
        email: "hash@example.com",
        password: "plain-password",
        role: "CUSTOMER",
      });

      const created = usersService.create.mock.calls[0][0];
      expect(created.passwordHash).not.toBe("plain-password");
      expect(await bcrypt.compare("plain-password", created.passwordHash)).toBe(
        true,
      );
    });
  });

  describe("login", () => {
    it("rejects unknown emails", async () => {
      usersService.findByEmail.mockResolvedValue(null);
      await expect(
        service.login("nobody@example.com", "whatever"),
      ).rejects.toBeInstanceOf(UnauthorizedException);
    });

    it("rejects wrong passwords", async () => {
      usersService.findByEmail.mockResolvedValue({
        ...baseUser,
        passwordHash: await bcrypt.hash("correct", 4),
      });
      await expect(
        service.login(baseUser.email, "wrong"),
      ).rejects.toBeInstanceOf(UnauthorizedException);
    });

    it("blocks suspended and rejected accounts", async () => {
      const passwordHash = await bcrypt.hash("correct", 4);

      for (const status of [
        AccountStatus.SUSPENDED,
        AccountStatus.REJECTED,
      ]) {
        usersService.findByEmail.mockResolvedValue({
          ...baseUser,
          passwordHash,
          status,
        });
        await expect(
          service.login(baseUser.email, "correct"),
        ).rejects.toBeInstanceOf(ForbiddenException);
      }
    });

    it("allows PENDING accounts to sign in (approval enforced by guards)", async () => {
      usersService.findByEmail.mockResolvedValue({
        ...baseUser,
        passwordHash: await bcrypt.hash("correct", 4),
        status: AccountStatus.PENDING,
        role: UserRole.MARKETER,
      });

      const result = await service.login(baseUser.email, "correct");
      expect(result.user.status).toBe(AccountStatus.PENDING);
      expect(result.tokens.accessToken).toBeTruthy();
    });

    it("returns a verifiable access token with role and status", async () => {
      usersService.findByEmail.mockResolvedValue({
        ...baseUser,
        passwordHash: await bcrypt.hash("correct", 4),
      });

      const { tokens } = await service.login(baseUser.email, "correct");
      const payload = service.verifyAccessToken(tokens.accessToken);

      expect(payload.sub).toBe(baseUser.id);
      expect(payload.role).toBe(UserRole.CUSTOMER);
      expect(payload.status).toBe(AccountStatus.APPROVED);
    });
  });

  describe("refresh", () => {
    it("rejects unknown, revoked, and expired tokens", async () => {
      prisma.refreshToken.findUnique.mockResolvedValue(null);
      await expect(service.refresh("missing")).rejects.toBeInstanceOf(
        UnauthorizedException,
      );

      prisma.refreshToken.findUnique.mockResolvedValue({
        id: "rt-1",
        revokedAt: new Date(),
        expiresAt: new Date(Date.now() + 10_000),
        user: { ...baseUser },
      });
      await expect(service.refresh("revoked")).rejects.toBeInstanceOf(
        UnauthorizedException,
      );

      prisma.refreshToken.findUnique.mockResolvedValue({
        id: "rt-2",
        revokedAt: null,
        expiresAt: new Date(Date.now() - 1000),
        user: { ...baseUser },
      });
      await expect(service.refresh("expired")).rejects.toBeInstanceOf(
        UnauthorizedException,
      );
    });

    it("rotates valid tokens: revokes old, issues new pair", async () => {
      prisma.refreshToken.findUnique.mockResolvedValue({
        id: "rt-3",
        revokedAt: null,
        expiresAt: new Date(Date.now() + 60_000),
        user: { ...baseUser },
      });

      const tokens = await service.refresh("valid-token");

      expect(prisma.refreshToken.update).toHaveBeenCalledWith({
        where: { id: "rt-3" },
        data: { revokedAt: expect.any(Date) },
      });
      expect(prisma.refreshToken.create).toHaveBeenCalled();
      expect(tokens.accessToken).toBeTruthy();
      expect(tokens.refreshToken).toBeTruthy();
    });
  });

  describe("logout", () => {
    it("revokes the presented refresh token", async () => {
      await service.logout("some-token");
      expect(prisma.refreshToken.updateMany).toHaveBeenCalledWith({
        where: expect.objectContaining({ revokedAt: null }),
        data: { revokedAt: expect.any(Date) },
      });
    });
  });
});
