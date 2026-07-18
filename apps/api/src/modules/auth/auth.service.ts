import {
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService, type JwtSignOptions } from "@nestjs/jwt";
import { AccountStatus, User, UserRole } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import { createHash, randomBytes } from "node:crypto";
import { PrismaService } from "../../database/prisma.service";
import { SafeUser, toSafeUser, UsersService } from "../users/users.service";
import type { AccessTokenPayload, AuthTokens } from "./auth.types";
import type { RegisterDto } from "./dto/register.dto";

const BCRYPT_ROUNDS = 12;

/**
 * Customers can use their account immediately; marketers and wholesale
 * traders must be approved by an admin before trading features unlock.
 */
function initialStatusFor(role: UserRole): AccountStatus {
  return role === UserRole.CUSTOMER
    ? AccountStatus.APPROVED
    : AccountStatus.PENDING;
}

function hashRefreshToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

function parseDurationMs(value: string): number {
  const match = /^(\d+)([smhd])$/.exec(value.trim());
  if (!match) return 30 * 24 * 60 * 60 * 1000; // default 30d
  const amount = Number(match[1]);
  const unit = { s: 1000, m: 60_000, h: 3_600_000, d: 86_400_000 }[
    match[2] as "s" | "m" | "h" | "d"
  ];
  return amount * unit;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly users: UsersService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async register(
    dto: RegisterDto,
  ): Promise<{ user: SafeUser; tokens: AuthTokens }> {
    const existing = await this.users.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException("An account with this email already exists");
    }

    const passwordHash = await bcrypt.hash(dto.password, BCRYPT_ROUNDS);
    const role = dto.role as UserRole;

    const user = await this.users.create({
      name: dto.name,
      email: dto.email,
      phone: dto.phone,
      passwordHash,
      role,
      status: initialStatusFor(role),
    });

    const tokens = await this.issueTokens(user);
    return { user: toSafeUser(user), tokens };
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ user: SafeUser; tokens: AuthTokens }> {
    const user = await this.users.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException("Invalid email or password");
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      throw new UnauthorizedException("Invalid email or password");
    }

    this.assertLoginAllowed(user.status);

    const tokens = await this.issueTokens(user);
    return { user: toSafeUser(user), tokens };
  }

  async refresh(refreshToken: string): Promise<AuthTokens> {
    const tokenHash = hashRefreshToken(refreshToken);
    const stored = await this.prisma.refreshToken.findUnique({
      where: { tokenHash },
      include: { user: true },
    });

    if (!stored || stored.revokedAt || stored.expiresAt < new Date()) {
      throw new UnauthorizedException("Refresh token is invalid or expired");
    }

    this.assertLoginAllowed(stored.user.status);

    // Rotate: revoke the used token and issue a fresh pair.
    await this.prisma.refreshToken.update({
      where: { id: stored.id },
      data: { revokedAt: new Date() },
    });

    return this.issueTokens(stored.user);
  }

  async logout(refreshToken: string): Promise<void> {
    const tokenHash = hashRefreshToken(refreshToken);
    await this.prisma.refreshToken.updateMany({
      where: { tokenHash, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }

  async getProfile(userId: string): Promise<SafeUser> {
    const user = await this.users.findById(userId);
    if (!user) {
      throw new UnauthorizedException("Account no longer exists");
    }
    return toSafeUser(user);
  }

  verifyAccessToken(token: string): AccessTokenPayload {
    try {
      return this.jwt.verify<AccessTokenPayload>(token, {
        secret: this.config.getOrThrow<string>("JWT_ACCESS_SECRET"),
      });
    } catch {
      throw new UnauthorizedException("Access token is invalid or expired");
    }
  }

  private assertLoginAllowed(status: AccountStatus): void {
    if (status === AccountStatus.SUSPENDED) {
      throw new ForbiddenException("This account has been suspended");
    }
    if (status === AccountStatus.REJECTED) {
      throw new ForbiddenException("This account request was rejected");
    }
    // PENDING accounts may sign in to check their approval status;
    // role/approval guards protect privileged operations.
  }

  private async issueTokens(user: User): Promise<AuthTokens> {
    const payload: AccessTokenPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      status: user.status,
    };

    const accessToken = await this.jwt.signAsync(payload, {
      secret: this.config.getOrThrow<string>("JWT_ACCESS_SECRET"),
      expiresIn: (this.config.get<string>("JWT_ACCESS_EXPIRES_IN") ??
        "15m") as JwtSignOptions["expiresIn"],
    });

    const refreshToken = randomBytes(48).toString("base64url");
    const refreshTtlMs = parseDurationMs(
      this.config.get<string>("JWT_REFRESH_EXPIRES_IN") ?? "30d",
    );

    await this.prisma.refreshToken.create({
      data: {
        tokenHash: hashRefreshToken(refreshToken),
        userId: user.id,
        expiresAt: new Date(Date.now() + refreshTtlMs),
      },
    });

    return { accessToken, refreshToken };
  }
}
