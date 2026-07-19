import { Injectable } from "@nestjs/common";
import {
  AccountStatus,
  MarketerProfile,
  Prisma,
  User,
  UserRole,
  WholesaleTraderProfile,
} from "@prisma/client";
import { PrismaService } from "../../database/prisma.service";

export type SafeUser = Omit<User, "passwordHash"> & {
  marketerProfile?: MarketerProfile | null;
  wholesaleTraderProfile?: WholesaleTraderProfile | null;
};

export type UserWithProfiles = User & {
  marketerProfile?: MarketerProfile | null;
  wholesaleTraderProfile?: WholesaleTraderProfile | null;
};

export function toSafeUser(user: User | UserWithProfiles): SafeUser {
  const { passwordHash: _passwordHash, ...rest } = user as UserWithProfiles & {
    passwordHash: string;
  };
  void _passwordHash;
  return rest;
}

const ALLOWED_TRANSITIONS: Record<AccountStatus, AccountStatus[]> = {
  PENDING: [AccountStatus.APPROVED, AccountStatus.REJECTED],
  APPROVED: [AccountStatus.SUSPENDED],
  REJECTED: [],
  SUSPENDED: [AccountStatus.APPROVED],
};

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });
  }

  findByPhone(phone: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { phone } });
  }

  findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  findByIdWithProfiles(id: string): Promise<UserWithProfiles | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        marketerProfile: true,
        wholesaleTraderProfile: true,
      },
    });
  }

  create(data: {
    name: string;
    email: string;
    phone?: string;
    passwordHash: string;
    role: UserRole;
    status: AccountStatus;
  }): Promise<User> {
    return this.prisma.user.create({
      data: {
        ...data,
        email: data.email.toLowerCase().trim(),
      },
    });
  }

  async list(filters: {
    status?: AccountStatus;
    role?: UserRole;
    page?: number;
    pageSize?: number;
  }): Promise<{ users: SafeUser[]; total: number }> {
    const where: Prisma.UserWhereInput = {
      ...(filters.status ? { status: filters.status } : {}),
      ...(filters.role ? { role: filters.role } : {}),
    };
    const page = filters.page ?? 1;
    const pageSize = filters.pageSize ?? 20;

    const [users, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          marketerProfile: true,
          wholesaleTraderProfile: true,
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    return { users: users.map(toSafeUser), total };
  }

  isTransitionAllowed(
    from: AccountStatus,
    to: AccountStatus,
  ): boolean {
    return ALLOWED_TRANSITIONS[from].includes(to);
  }

  async updateStatus(
    id: string,
    status: AccountStatus,
    reviewerId: string,
    note?: string,
  ): Promise<SafeUser> {
    const current = await this.findById(id);
    if (!current) {
      throw new Error("Account not found");
    }

    if (!this.isTransitionAllowed(current.status, status)) {
      const err = new Error("Invalid account status transition");
      (err as Error & { code?: string }).code = "INVALID_STATUS_TRANSITION";
      throw err;
    }

    const user = await this.prisma.$transaction(async (tx) => {
      const updated = await tx.user.update({
        where: { id },
        data: { status },
        include: {
          marketerProfile: true,
          wholesaleTraderProfile: true,
        },
      });

      await tx.accountStatusHistory.create({
        data: {
          userId: id,
          reviewerId,
          previousStatus: current.status,
          newStatus: status,
          note: note || null,
        },
      });

      return updated;
    });

    return toSafeUser(user);
  }
}
