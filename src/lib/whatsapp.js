// Store WhatsApp number in international format, no leading zero, no "+".
// 08169644795 -> 2348169644795
export const STORE_WHATSAPP_NUMBER = "2348169644795";

export function formatNaira(amount) {
  return `₦${Number(amount).toLocaleString("en-NG")}`;
}

/**
 * Builds a wa.me link pre-filled with the order summary so the
 * customer can review and send it straight to the store's WhatsApp.
 */
export function buildWhatsAppOrderLink({ items, customer, total }) {
  const lines = [
    "Hello Funmsy Store, I'd like to place an order:",
    "",
    ...items.map(
      (item) =>
        `• ${item.name} (Size ${item.size}) x${item.quantity} — ${formatNaira(
          item.price * item.quantity
        )}`
    ),
    "",
    `Total: ${formatNaira(total)}`,
    "",
    `Name: ${customer.name}`,
    `Phone: ${customer.phone}`,
    `Delivery address: ${customer.address}`,
    customer.note ? `Note: ${customer.note}` : null,
  ].filter(Boolean);

  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${text}`;
}
