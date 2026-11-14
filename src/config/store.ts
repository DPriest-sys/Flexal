/**
 * Central Storefront Configuration for Flexal
 *
 * Replace `whatsappNumber` below with your live WhatsApp Business number
 * using international digits only (no "+" sign, spaces, or dashes).
 * Example: "14155550199" for +1 (415) 555-0199 or "447700900123" for +44 7700 900123.
 */
export const STORE_CONFIG = {
  brandName: "Flexal",
  whatsappNumber: "10000000000",
  currencySymbol: "₦",
  studioEmail: "concierge@flexalstudio.com",
  studioLocation: "Studio Showroom · 24 Mercer Row",
  studioHours: "Monday – Saturday · 09:00 – 19:00",
  socialLinks: {
    instagram: "https://instagram.com",
    tiktok: "https://tiktok.com",
    pinterest: "https://pinterest.com",
  },
} as const;

export function formatPrice(amount: number): string {
  return `${STORE_CONFIG.currencySymbol}${amount.toLocaleString("en-NG", {
    maximumFractionDigits: 0,
  })}`;
}

export function buildWhatsAppUrl(message: string, customNumber?: string): string {
  const digits = (customNumber ?? STORE_CONFIG.whatsappNumber).replace(/\D/g, "");
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${digits}?text=${encoded}`;
}
