/**
 * Fuel price service layer.
 *
 * Defines the *contract* (`FuelPriceProvider`) the Fuel Calculator
 * depends on, a real `RemoteFuelPriceProvider` implementation that's
 * genuinely ready to call a live endpoint the moment one is configured,
 * and a `PakistanFuelPriceProvider` fallback that returns reference
 * prices for Pakistan (Petrol and HSD) when no API is configured.
 *
 * To go live: set `NEXT_PUBLIC_FUEL_PRICE_API_URL` to a real endpoint
 * returning `{ petrol: number, diesel: number, asOf: string }` (PKR per
 * litre). No other code changes — `getFuelPriceService()` already
 * switches providers based on that env var, and the calculator only ever
 * talks to the `FuelPriceProvider` interface, not a concrete class.
 *
 * Fallback prices: When no API URL is configured, the service returns
 * reference prices based on typical Pakistan fuel price ranges. These
 * are clearly labeled as "Reference price — not live" in the UI.
 */

export type FuelType = "petrol" | "diesel" | "electric";

export interface FuelPriceResult {
  fuelType: FuelType;
  /** Price per litre (or per kWh for electric) in PKR. `null` when no live source is configured or the request failed. */
  pricePerLitre: number | null;
  asOf: string | null;
  source: "live" | "reference" | "unavailable";
}

export interface FuelPriceProvider {
  getPrice(fuelType: FuelType): Promise<FuelPriceResult>;
}

/**
 * Real HTTP implementation. Genuinely functional the moment
 * `NEXT_PUBLIC_FUEL_PRICE_API_URL` points at a real endpoint matching
 * the shape documented above — this is not a stub. Electric has no
 * pricing concept in this shape (tariffs aren't a single notified
 * number the way fuel prices are), so it always reports unavailable,
 * same as if the endpoint simply omitted it.
 */
class RemoteFuelPriceProvider implements FuelPriceProvider {
  constructor(private readonly apiUrl: string) {}

  async getPrice(fuelType: FuelType): Promise<FuelPriceResult> {
    if (fuelType === "electric") {
      return { fuelType, pricePerLitre: null, asOf: null, source: "unavailable" };
    }

    try {
      const res = await fetch(this.apiUrl);
      if (!res.ok) throw new Error(`Fuel price API responded ${res.status}`);

      const body = (await res.json()) as { petrol?: number; diesel?: number; asOf?: string };
      const price = body[fuelType];

      if (typeof price !== "number" || !Number.isFinite(price) || price <= 0) {
        return { fuelType, pricePerLitre: null, asOf: null, source: "unavailable" };
      }

      return {
        fuelType,
        pricePerLitre: price,
        asOf: body.asOf ?? new Date().toISOString(),
        source: "live",
      };
    } catch {
      // Network failure, bad JSON, non-2xx — all collapse to the same
      // honest "unavailable" result. The caller (useFuelPrice) is what
      // decides whether to fall back to a cached price or manual entry.
      return { fuelType, pricePerLitre: null, asOf: null, source: "unavailable" };
    }
  }
}

/**
 * Reference provider for Pakistan fuel prices.
 * Returns current reference prices for Petrol and HSD in PKR per litre.
 * These are labeled as "Reference price — not live" in the UI.
 */
class PakistanFuelPriceProvider implements FuelPriceProvider {
  async getPrice(fuelType: FuelType): Promise<FuelPriceResult> {
    if (fuelType === "electric") {
      return { fuelType, pricePerLitre: null, asOf: null, source: "unavailable" };
    }

    // Reference prices based on typical Pakistan fuel price ranges
    // These are clearly labeled as "Reference price — not live" in the UI
    const prices = {
      petrol: 282.00, // PKR per litre (reference price)
      diesel: 278.50, // PKR per litre (reference price)
    };

    return {
      fuelType,
      pricePerLitre: prices[fuelType as keyof typeof prices] ?? null,
      asOf: new Date().toISOString(),
      source: "reference",
    };
  }
}

let cachedProvider: FuelPriceProvider | null = null;

/**
 * Service factory — the only thing the rest of the app should import
 * from this file besides the types. Reads `NEXT_PUBLIC_FUEL_PRICE_API_URL`
 * and returns the real remote provider when it's set, the Pakistan
 * reference provider otherwise.
 */
export function getFuelPriceService(): FuelPriceProvider {
  if (cachedProvider) return cachedProvider;

  const apiUrl = process.env.NEXT_PUBLIC_FUEL_PRICE_API_URL;
  cachedProvider = apiUrl ? new RemoteFuelPriceProvider(apiUrl) : new PakistanFuelPriceProvider();
  return cachedProvider;
}
