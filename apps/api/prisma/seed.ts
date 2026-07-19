/**
 * Seeds the initial super admin account.
 *
 * Usage (from apps/api):
 *   SUPER_ADMIN_EMAIL=... SUPER_ADMIN_PASSWORD=... npm run seed:admin
 *
 * Also accepts SEED_SUPER_ADMIN_* for Day 5 compatibility.
 *
 * Idempotent: if a user with the email already exists it is promoted to
 * SUPER_ADMIN / APPROVED instead of being duplicated.
 */
import { AccountStatus, PrismaClient, UserRole } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email =
    process.env.SUPER_ADMIN_EMAIL || process.env.SEED_SUPER_ADMIN_EMAIL;
  const password =
    process.env.SUPER_ADMIN_PASSWORD || process.env.SEED_SUPER_ADMIN_PASSWORD;
  const name =
    process.env.SUPER_ADMIN_NAME ||
    process.env.SEED_SUPER_ADMIN_NAME ||
    "Velvet Kids Admin";
  const phone =
    process.env.SUPER_ADMIN_PHONE || process.env.SEED_SUPER_ADMIN_PHONE;

  if (!email || !password) {
    throw new Error(
      "SUPER_ADMIN_EMAIL and SUPER_ADMIN_PASSWORD must be set (or SEED_SUPER_ADMIN_* equivalents)",
    );
  }
  if (password.length < 12) {
    throw new Error("Super admin password must be at least 12 characters");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.user.upsert({
    where: { email: email.toLowerCase().trim() },
    update: {
      role: UserRole.SUPER_ADMIN,
      status: AccountStatus.APPROVED,
      ...(phone ? { phone } : {}),
    },
    create: {
      name,
      email: email.toLowerCase().trim(),
      phone: phone || null,
      passwordHash,
      role: UserRole.SUPER_ADMIN,
      status: AccountStatus.APPROVED,
    },
  });

  console.log(`Super admin ready: ${user.email}`);
}

main()
  .catch((error) => {
    console.error(error instanceof Error ? error.message : "Seed failed");
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
