import assert from "node:assert/strict";
import test from "node:test";
import {
  buildEncodedWhatsAppUrl,
  buildLocalizedOrderMessage,
  calculateResolvedSubtotal,
} from "./whatsapp-core.ts";

const items = [{ name: "Test Product", options: [], quantity: 2, price: 79, currency: "ILS" }];
const customer = {
  fullName: "Test Customer",
  phone: "0599000000",
  city: "Ramallah",
  area: "Center",
  address: "Main Street",
  landmark: "",
  notes: "",
};

test("subtotal and English WhatsApp message are correct", () => {
  const subtotal = calculateResolvedSubtotal(items);
  assert.equal(subtotal, 158);
  const message = buildLocalizedOrderMessage({ locale: "en", items, customer, subtotal });
  assert.match(message, /New Velvet Kids Order/);
  assert.match(message, /Quantity: 2/);
  assert.doesNotMatch(message, /Landmark:/);
});

test("Arabic message and URL encoding are correct", () => {
  const subtotal = calculateResolvedSubtotal(items);
  const message = buildLocalizedOrderMessage({ locale: "ar", items, customer, subtotal });
  assert.match(message, /طلب جديد من Velvet Kids/);
  const url = buildEncodedWhatsAppUrl("970599000000", message);
  assert.ok(url?.startsWith("https://wa.me/970599000000?text="));
  assert.ok(url?.includes("%D8"));
  assert.equal(buildEncodedWhatsAppUrl("+970 599", message), null);
});
