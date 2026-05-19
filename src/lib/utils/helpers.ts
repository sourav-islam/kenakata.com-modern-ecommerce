// src/lib/utils/helpers.ts

/**
 * Price format koro — $10.99
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style:    "currency",
    currency: "USD",
  }).format(price);
}

/**
 * Image URL validate koro — Platzi API te sometimes broken URL ashe
 */
export function getSafeImageUrl(images: string[]): string {
  if (!images || images.length === 0) {
    return "https://placehold.co/400x400/f1f5f9/64748b?text=No+Image";
  }

  const raw = images[0];

  // JSON string e wrap kora thakle extract koro
  if (raw.startsWith("[")) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return cleanImageUrl(parsed[0]);
      }
    } catch {
      // ignore
    }
  }

  return cleanImageUrl(raw);
}

function cleanImageUrl(url: string): string {
  // Quotes remove koro
  const cleaned = url.replace(/["[\]]/g, "").trim();

  // Valid URL check
  try {
    const parsed = new URL(cleaned);
    const blockedHosts = new Set(["placeimg.com"]);
    if (blockedHosts.has(parsed.hostname.toLowerCase())) {
      return "https://placehold.co/400x400/f1f5f9/64748b?text=No+Image";
    }
    return cleaned;
  } catch {
    return "https://placehold.co/400x400/f1f5f9/64748b?text=No+Image";
  }
}

/**
 * Text truncate koro
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

/**
 * Rating star generate koro
 */
export function generateRating(id: number): number {
  // API te rating nai — deterministic fake rating banai
  return Number(((id % 5) + 0.5 * (id % 3) + 3).toFixed(1));
}

/**
 * Discount percentage calculate koro
 */
export function calculateDiscount(
  original: number,
  discounted: number
): number {
  return Math.round(((original - discounted) / original) * 100);
}