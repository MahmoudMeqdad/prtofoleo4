# Testing Strategy

Day 4 introduces real automated tests using Node's built-in test runner and TypeScript type stripping; no test dependency was added.

Covered in `apps/web/src/store/cart-types.test.ts` and `apps/web/src/lib/whatsapp-order.test.ts`:

- add and merge identical cart lines;
- keep different option values as separate lines;
- clamp quantity above zero;
- calculate estimated subtotal;
- English and Arabic WhatsApp messages;
- omit empty optional fields;
- safely encode WhatsApp URLs and reject invalid numbers.

Run `npm run test` in `apps/web`, plus `npm run lint`, `npm run typecheck`, and `npm run build`. Browser verification covers localized product routes, 404s, persistence, drawer, form validation, search, RTL, overflow, console, and screenshots.
