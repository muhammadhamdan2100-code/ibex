import type { FuelType } from "@/lib/services/fuel-price-service";

/**
 * Caching logic — isolated from both the fuel-price service (which
 * decides *how* to fetch a price) and the UI (which decides *how to
 * display* a cached vs. live value). Backed by `localStorage`, so a
 * price successfully fetched once genuinely survives a page reload or a
 * later API outage — this is real persistence, not an in-memory value
 * that resets on refresh.
 */

const CACHE_KEY_PREFIX = "ibex-fuel-price-cache:";
/** How long a cached price is considered fresh enough to prefer over a failed live fetch, in milliseconds. */
export const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours

export interface CachedFuelPrice {
  fuelType: FuelType;
  pricePerUnit: number;
  cachedAt: string; // ISO timestamp
}

function isBrowser() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function getCachedPrice(fuelType: FuelType): CachedFuelPrice | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(CACHE_KEY_PREFIX + fuelType);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CachedFuelPrice;
    if (typeof parsed.pricePerUnit !== "number" || !parsed.cachedAt) return null;
    return parsed;
  } catch {
    // Corrupted or inaccessible storage (private browsing, quota, etc.)
    // — treat exactly like "no cache," never throw from a cache read.
    return null;
  }
}

export function setCachedPrice(fuelType: FuelType, pricePerUnit: number): void {
  if (!isBrowser()) return;
  const entry: CachedFuelPrice = { fuelType, pricePerUnit, cachedAt: new Date().toISOString() };
  try {
    window.localStorage.setItem(CACHE_KEY_PREFIX + fuelType, JSON.stringify(entry));
  } catch {
    // Storage full or unavailable — the app still works without the
    // cache, so this is intentionally a silent no-op, not an error.
  }
}

export function isCacheStale(entry: CachedFuelPrice, ttlMs: number = CACHE_TTL_MS): boolean {
  const age = Date.now() - new Date(entry.cachedAt).getTime();
  return age > ttlMs;
}
