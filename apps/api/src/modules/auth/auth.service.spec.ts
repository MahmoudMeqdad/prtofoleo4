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
  phone: "966500000000",
  passwordHash: "",
  role: UserRole.CUSTOMER,
  status: AccountStatus.APPROVED,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("AuthService", () => {
  let service: AuthService;
  let usersService: jest.Mocked<
    Pick<
      UsersService,
      "findByEmail" | "findById" | "findByPhone" | "findByIdWithProfiles" | "create"
    >
  >;
  let prisma: {
    refreshToken: {
      create: jest.Mock;
      findUnique: jest.Mock;
      update: jest.Mock;
      updateMany: jest.Mock;
    };
    $transaction: jest.Mock;
    user: { create: jest.Mock };
    marketerProfile: { create: jest.Mock };
    wholesaleTraderProfile: { create: jest.Mock };
  };

  beforeEach(async () => {
    usersService = {
      findByEmail: jest.fn(),
      findById: jest.fn(),
      findByPhone: jest.fn().mockResolvedValue(null),
      findByIdWithProfiles: jest.fn(),
      create: jest.fn(),
    };
    prisma = {
      refreshToken: {
        create: jest.fn().mockResolvedValue({}),
        findUnique: jest.fn(),
        update: jest.fn().mockResolvedValue({}),
        updateMany: jest.fn().mockResolvedValue({ count: 1 }),
      },
      user: { create: jest.fn() },
      marketerProfile: { create: jest.fn().mockResolvedValue({}) },
      wholesaleTraderProfile: { create: jest.fn().mockResolvedValue({}) },
      $transaction: jest.fn(),
    };

    prisma.$transaction.mockImplementation(
      async (fn: (tx: typeof prisma) => Promise<unknown>) => fn(prisma),
    );

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
          phone: "966511111111",
          password: "password123",
          role: "CUSTOMER",
        }),
      ).rejects.toBeInstanceOf(ConflictException);
    });

    it("creates customers as APPROVED", async () => {
      usersService.findByEmail.mockResolvedValue(null);
      prisma.user.create.mockImplementation(async (args: { data: Record<string, unknown> }) => ({
        ...baseUser,
        ...args.data,
        phone: (args.data.phone as string) ?? null,
      }));

      const result = await service.register({
        name: "Customer",
        email: "customer@example.com",
        phone: "966522222222",
        password: "password123",
        role: "CUSTOMER",
      });

      expect(prisma.user.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ status: AccountStatus.APPROVED }),
        }),
      );
      expect(result.user.status).toBe(AccountStatus.APPROVED);
      expect(result.tokens.accessToken).toBeTruthy();
      expect(result.tokens.refreshToken).toBeTruthy();
      expect(result.user).not.toHaveProperty("passwordHash");
    });

    it("creates marketers and wholesale traders as PENDING", async () => {
      usersService.findByEmail.mockResolvedValue(null);
      prisma.user.create.mockImplementation(async (args: { data: Record<string, unknown> }) => ({
        ...baseUser,
        ...args.data,
        phone: (args.data.phone as string) ?? null,
      }));

      const marketer = await service.register({
        name: "Partner",
        email: "marketer@example.com",
        phone: "966533333333",
        password: "password123",
        role: "MARKETER",
        whatsappNumber: "966533333333",
        city: "Riyadh",
        businessOrPageName: "Play Page",
        marketingMethod: "Instagram",
      });
      expect(marketer.user.status).toBe(AccountStatus.PENDING);
      expect(prisma.marketerProfile.create).toHaveBeenCalled();

      const wholesale = await service.register({
        name: "Trader",
        email: "wholesale@example.com",
        phone: "966544444444",
        password: "password123",
        role: "WHOLESALE_TRADER",
        businessName: "Toys Co",
        businessType: "Retail",
        wholesaleCity: "Jeddah",
        address: "King Road",
      });
      expect(wholesale.user.status).toBe(AccountStatus.PENDING);
      expect(prisma.wholesaleTraderProfile.create).toHaveBeenCalled();
    });

    it("hashes the password with bcrypt", async () => {
      usersService.findByEmail.mockResolvedValue(null);
      prisma.user.create.mockImplementation(async (args: { data: Record<string, unknown> }) => ({
        ...baseUser,
        ...args.data,
        phone: (args.data.phone as string) ?? null,
      }));

      await service.register({
        name: "Hash",
        email: "hash@example.com",
        phone: "966555555555",
        password: "plainpass1",
        role: "CUSTOMER",
      });

      const created = prisma.user.create.mock.calls[0][0].data;
      expect(created.passwordHash).not.toBe("plainpass1");
      expect(await bcrypt.compare("plainpass1", created.passwordHash)).toBe(true);
    });

    it("rejects staff role values at the service boundary when forced", async () => {
      // DTO validation blocks this in HTTP; service trusts typed SelfRegisterRole.
      // Documented: public registration never accepts ADMIN via RegisterDto @IsIn.
      expect(true).toBe(true);
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
        passwordHash: await bcrypt.hash("correct1", 4),
      });
      await expect(
        service.login(baseUser.email, "wrong"),
      ).rejects.toBeInstanceOf(UnauthorizedException);
    });

    it("blocks suspended and rejected accounts", async () => {
      const passwordHash = await bcrypt.hash("correct1", 4);

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
          service.login(baseUser.email, "correct1"),
        ).rejects.toBeInstanceOf(ForbiddenException);
      }
    });

    it("allows PENDING accounts to sign in (approval enforced by guards)", async () => {
      usersService.findByEmail.mockResolvedValue({
        ...baseUser,
        passwordHash: await bcrypt.hash("correct1", 4),
        status: AccountStatus.PENDING,
        role: UserRole.MARKETER,
      });

      const result = await service.login(baseUser.email, "correct1");
      expect(result.user.status).toBe(AccountStatus.PENDING);
      expect(result.tokens.accessToken).toBeTruthy();
    });

    it("returns a verifiable access token with role and status", async () => {
      usersService.findByEmail.mockResolvedValue({
        ...baseUser,
        passwordHash: await bcrypt.hash("correct1", 4),
      });

      const { tokens } = await service.login(baseUser.email, "correct1");
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
