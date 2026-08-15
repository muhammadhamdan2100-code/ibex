"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getFuelPriceService, type FuelType } from "@/lib/services/fuel-price-service";
import { getCachedPrice, setCachedPrice, isCacheStale, type CachedFuelPrice } from "@/lib/services/fuel-price-cache";

export type PriceSource = "live" | "cached" | "manual" | "loading" | "unavailable" | "reference";

export interface FuelPriceState {
  /** The price actually in effect — from whichever source is active. Empty string when nothing is available yet and the user hasn't typed one in. */
  price: string;
  source: PriceSource;
  /** ISO timestamp of the live/cached value currently shown — null in manual/unavailable states. */
  asOf: string | null;
  isRefreshing: boolean;
  /** True once the user has typed a value directly — refresh calls no longer overwrite it until they clear the override. */
  isManualOverride: boolean;
  setManualPrice: (value: string) => void;
  clearManualOverride: () => void;
  refresh: () => void;
}

const AUTO_REFRESH_MS = 5 * 60 * 1000; // 5 minutes

/**
 * The calculator "must never fail" per the brief — this hook is the
 * mechanism: on every fetch attempt (initial load, auto-refresh, manual
 * refresh) it tries live first, falls back to a cached price if the live
 * call fails, and only shows a truly empty field (asking the user to
 * type one) if neither exists — it never throws out to the UI and never
 * leaves the price field in a broken/undefined state.
 */
export function useFuelPrice(fuelType: FuelType): FuelPriceState {
  const [price, setPrice] = useState("");
  const [source, setSource] = useState<PriceSource>("loading");
  const [asOf, setAsOf] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isManualOverride, setIsManualOverride] = useState(false);
  const manualOverrideRef = useRef(isManualOverride);
  manualOverrideRef.current = isManualOverride;

  const fetchPrice = useCallback(async () => {
    if (manualOverrideRef.current) return; // never clobber a value the user is actively typing/has chosen

    setIsRefreshing(true);
    try {
      const result = await getFuelPriceService().getPrice(fuelType);

      if (result.source === "live" && result.pricePerLitre !== null) {
        setCachedPrice(fuelType, result.pricePerLitre);
        setPrice(String(result.pricePerLitre));
        setSource("live");
        setAsOf(result.asOf);
        return;
      }

      // Live fetch failed or returned nothing usable — fall back to reference prices
      // (when no API is configured) or cached price.
      if (result.source === "reference" && result.pricePerLitre !== null) {
        setPrice(String(result.pricePerLitre));
        setSource("reference");
        setAsOf(result.asOf);
        return;
      }

      // Reference data not available — fall back to cache.
      const cached: CachedFuelPrice | null = getCachedPrice(fuelType);
      if (cached) {
        setPrice(String(cached.pricePerUnit));
        setSource("cached");
        setAsOf(cached.cachedAt);
        return;
      }

      // No live, reference, or cached data — leave the field empty for manual entry
      // rather than ever showing a fabricated number.
      setSource("unavailable");
      setAsOf(null);
    } finally {
      setIsRefreshing(false);
    }
  }, [fuelType]);

  // Initial load + whenever the fuel type changes.
  useEffect(() => {
    manualOverrideRef.current = false; // synchronous, same reasoning as clearManualOverride above
    setIsManualOverride(false);
    fetchPrice();
  }, [fetchPrice]);

  // Auto-refresh.
  useEffect(() => {
    const id = setInterval(fetchPrice, AUTO_REFRESH_MS);
    return () => clearInterval(id);
  }, [fetchPrice]);

  const setManualPrice = useCallback((value: string) => {
    setIsManualOverride(true);
    setSource("manual");
    setAsOf(null);
    setPrice(value);
  }, []);

  const clearManualOverride = useCallback(() => {
    manualOverrideRef.current = false; // synchronous — fetchPrice's guard reads this immediately, before the setIsManualOverride below has re-rendered
    setIsManualOverride(false);
    fetchPrice();
  }, [fetchPrice]);

  return { price, source, asOf, isRefreshing, isManualOverride, setManualPrice, clearManualOverride, refresh: fetchPrice };
}

/** Small helper for "cached — stale?" badges the UI may want without importing the cache module directly. */
export function isPriceStale(entry: CachedFuelPrice): boolean {
  return isCacheStale(entry);
}
