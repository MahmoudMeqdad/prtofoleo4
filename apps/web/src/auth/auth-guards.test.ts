import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { authErrorDictionaryKey } from "./auth-errors.ts";
import {
  accountStatusPath,
  canAccessAdminAccounts,
  canAccessAccountHome,
  resolvePostAuthPath,
} from "./auth-guards.ts";
import type { AuthUser } from "./auth-types.ts";

describe("auth-guards", () => {
  const base: AuthUser = {
    id: "1",
    name: "Aisha Hassan",
    email: "aisha@example.com",
    role: "CUSTOMER",
    status: "APPROVED",
  };

  it("routes pending accounts to pending page", () => {
    assert.equal(
      resolvePostAuthPath({ ...base, role: "MARKETER", status: "PENDING" }),
      "/account/pending",
    );
  });

  it("routes rejected accounts to rejected page", () => {
    assert.equal(accountStatusPath("REJECTED"), "/account/rejected");
  });

  it("routes suspended accounts to suspended page", () => {
    assert.equal(accountStatusPath("SUSPENDED"), "/account/suspended");
  });

  it("allows only approved users into account home", () => {
    assert.equal(canAccessAccountHome(base), true);
    assert.equal(
      canAccessAccountHome({ ...base, status: "PENDING" }),
      false,
    );
  });

  it("blocks unauthorized admin access", () => {
    assert.equal(canAccessAdminAccounts(base), false);
    assert.equal(
      canAccessAdminAccounts({
        ...base,
        role: "ADMIN",
        status: "APPROVED",
      }),
      true,
    );
    assert.equal(
      canAccessAdminAccounts({
        ...base,
        role: "ADMIN",
        status: "PENDING",
      }),
      false,
    );
  });
});

describe("auth-errors", () => {
  it("maps invalid credentials to a stable dictionary key", () => {
    assert.equal(authErrorDictionaryKey("INVALID_CREDENTIALS"), "invalidCredentials");
  });
});

describe("registration role options", () => {
  it("only exposes public self-register roles", async () => {
    const { SELF_REGISTER_ROLES } = await import("@iplay/shared");
    assert.deepEqual([...SELF_REGISTER_ROLES], [
      "CUSTOMER",
      "MARKETER",
      "WHOLESALE_TRADER",
    ]);
  });
});
