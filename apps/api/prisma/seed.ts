/**
 * Seeds the initial super admin account.
 *
 * Usage (from apps/api):
 *   SEED_SUPER_ADMIN_EMAIL=... SEED_SUPER_ADMIN_PASSWORD=... npm run seed:admin
 *
 * Idempotent: if a user with the email already exists it is promoted to
 * SUPER_ADMIN / APPROVED instead of being duplicated.
 */
import { AccountStatus, PrismaClient, UserRole } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.SEED_SUPER_ADMIN_EMAIL;
  const password = process.env.SEED_SUPER_ADMIN_PASSWORD;
  const name = process.env.SEED_SUPER_ADMIN_NAME ?? "Velvet Kids Admin";

  if (!email || !password) {
    throw new Error(
      "SEED_SUPER_ADMIN_EMAIL and SEED_SUPER_ADMIN_PASSWORD must be set",
    );
  }
  if (password.length < 12) {
    throw new Error("Super admin password must be at least 12 characters");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      role: UserRole.SUPER_ADMIN,
      status: AccountStatus.APPROVED,
    },
    create: {
      name,
      email,
      passwordHash,
      role: UserRole.SUPER_ADMIN,
      status: AccountStatus.APPROVED,
    },
  });

  console.log(`Super admin ready: ${user.email} (${user.id})`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
