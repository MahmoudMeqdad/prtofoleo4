import { Injectable } from "@nestjs/common";
import { AccountStatus, Prisma, User, UserRole } from "@prisma/client";
import { PrismaService } from "../../database/prisma.service";

export type SafeUser = Omit<User, "passwordHash">;

export function toSafeUser(user: User): SafeUser {
  const safe: Partial<User> = { ...user };
  delete safe.passwordHash;
  return safe as SafeUser;
}

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  create(data: {
    name: string;
    email: string;
    phone?: string;
    passwordHash: string;
    role: UserRole;
    status: AccountStatus;
  }): Promise<User> {
    return this.prisma.user.create({ data });
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
      }),
      this.prisma.user.count({ where }),
    ]);

    return { users: users.map(toSafeUser), total };
  }

  async updateStatus(id: string, status: AccountStatus): Promise<SafeUser> {
    const user = await this.prisma.user.update({
      where: { id },
      data: { status },
    });
    return toSafeUser(user);
  }
}
