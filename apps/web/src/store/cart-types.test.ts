import assert from "node:assert/strict";
import test from "node:test";
import { addCartLine, createCartItemKey, updateCartLineQuantity } from "./cart-types.ts";

test("cart adds and merges identical product options", () => {
  const options = [{ optionId: "style", valueId: "classic" }];
  const item = {
    key: createCartItemKey("p1", options),
    productId: "p1",
    productSlug: "creative-studio-make",
    quantity: 1,
    selectedOptions: options,
  };
  const once = addCartLine([], item);
  assert.equal(once.length, 1);
  assert.equal(addCartLine(once, item)[0].quantity, 2);
});

test("different options make separate lines and quantity stays above zero", () => {
  const a = [{ optionId: "style", valueId: "classic" }];
  const b = [{ optionId: "style", valueId: "bright" }];
  const items = addCartLine(
    addCartLine([], {
      key: createCartItemKey("p1", a),
      productId: "p1",
      productSlug: "x",
      quantity: 1,
      selectedOptions: a,
    }),
    {
      key: createCartItemKey("p1", b),
      productId: "p1",
      productSlug: "x",
      quantity: 1,
      selectedOptions: b,
    },
  );
  assert.equal(items.length, 2);
  assert.equal(updateCartLineQuantity(items, items[0].key, 0)[0].quantity, 1);
});
