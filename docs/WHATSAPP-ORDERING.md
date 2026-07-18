# WhatsApp Ordering

Set `NEXT_PUBLIC_WHATSAPP_NUMBER` to the approved international business number using digits only, for example `970599000000`. Do not include `+`, spaces, or punctuation. When missing or invalid, final submission is disabled and a configuration message is shown.

The cart form collects name, phone, city, area, address, optional landmark, and optional notes. After validation, the app resolves localized product and option labels, quantities, unit prices, item totals, and estimated subtotal. It adds an availability/delivery confirmation notice and opens `https://wa.me/{number}?text={encodedMessage}`. Empty optional fields are omitted. The cart is not cleared automatically.

This stage creates no persisted order. A future backend can replace the URL handoff while reusing the cart and validation models.
