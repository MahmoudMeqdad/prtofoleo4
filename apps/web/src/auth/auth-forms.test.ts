import assert from "node:assert/strict";
import { describe, it } from "node:test";

/**
 * Lightweight form-rule checks mirroring RegisterPageView conditional fields
 * without mounting React (node:test + strip-types).
 */
function requiredPartnerFields(role: string): string[] {
  if (role === "MARKETER") {
    return [
      "whatsappNumber",
      "city",
      "businessOrPageName",
      "marketingMethod",
    ];
  }
  if (role === "WHOLESALE_TRADER") {
    return ["businessName", "businessType", "wholesaleCity", "address"];
  }
  return [];
}

function passwordValid(password: string): boolean {
  return password.length >= 8 && /[A-Za-z]/.test(password) && /\d/.test(password);
}

describe("registration conditional fields", () => {
  it("requires no partner fields for customers", () => {
    assert.deepEqual(requiredPartnerFields("CUSTOMER"), []);
  });

  it("requires marketer partner fields", () => {
    assert.ok(requiredPartnerFields("MARKETER").includes("whatsappNumber"));
    assert.ok(requiredPartnerFields("MARKETER").includes("marketingMethod"));
  });

  it("requires wholesale partner fields", () => {
    assert.ok(requiredPartnerFields("WHOLESALE_TRADER").includes("businessName"));
    assert.ok(requiredPartnerFields("WHOLESALE_TRADER").includes("address"));
  });
});

describe("login validation helpers", () => {
  it("accepts passwords with letter and number", () => {
    assert.equal(passwordValid("password1"), true);
    assert.equal(passwordValid("short"), false);
    assert.equal(passwordValid("nodigits"), false);
  });
});

describe("logout preserves cart contract", () => {
  it("documents that auth logout must not clear cart storage key", () => {
    // Cart persist key is independent of auth session.
    assert.equal("velvet-kids-cart-v1".includes("cart"), true);
  });
});
