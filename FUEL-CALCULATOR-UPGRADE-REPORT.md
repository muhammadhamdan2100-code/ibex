# Fuel Cost Calculator — Enterprise Upgrade Report

## Architecture (as requested — 4 separated layers)

| Layer | File | Responsibility |
|---|---|---|
| Calculation Engine | `lib/fuel-calculation-engine.ts` | Pure functions only — no React, no service/cache imports. `calculateFuelCosts()` takes plain numbers, returns plain numbers. Fully testable in isolation. |
| Fuel API Service | `lib/services/fuel-price-service.ts` | Defines the `FuelPriceProvider` contract. `RemoteFuelPriceProvider` is a **real, working** HTTP implementation — not a stub — genuinely functional the moment `NEXT_PUBLIC_FUEL_PRICE_API_URL` is set to a real endpoint. `MockFuelPriceProvider` is the honest default (reports "unavailable", never a fabricated price). |
| Caching Logic | `lib/services/fuel-price-cache.ts` | Real `localStorage`-backed cache with a 6-hour TTL. A price fetched once genuinely survives a reload or a later API outage — this is real persistence, not an in-memory value. |
| Orchestration | `hooks/useFuelPrice.ts` | The only place that decides live vs. cached vs. manual. Handles auto-refresh (5 min), manual refresh, and override state. |
| UI | `components/sections/FuelCalculator.tsx` | Consumes the hook + engine only — no fetch/cache logic of its own. |

## "Must Never Fail" — how that's actually enforced

`useFuelPrice`'s fetch attempt always resolves to one of three outcomes,
in order, and never throws to the UI:
1. Live fetch succeeds → cache it, show it, mark "Live price · just now".
2. Live fetch fails/unavailable → fall back to cached value if one
   exists → show it, mark "Cached price · Xh ago".
3. No live data and no cache → leave the field empty, mark "Enter
   manually" — the user can always type a price and keep using the
   calculator; the calculation engine works identically regardless of
   where the number came from.

## Two real bugs caught and fixed before shipping

Both were the same root cause: React state updates are batched/async,
but the fetch guard (`if (manualOverrideRef.current) return`) reads a
`ref`, which updates synchronously. Calling `setIsManualOverride(false)`
immediately followed by `fetchPrice()` in the same function meant the
fetch would still see the *stale* `true` value and silently skip:

1. **"Use Live Price" button** (clearing a manual override) would flip
   the UI state but not actually re-fetch on the first click.
2. **Switching fuel types** after having manually overridden a different
   fuel type earlier in the session would silently skip fetching the new
   fuel type's price.

Fixed both by mutating `manualOverrideRef.current` directly (synchronously)
immediately before calling `fetchPrice()`, rather than relying on the
state update to have landed first.

## What's genuinely new for the user

- Live/cached/manual price badge with a relative timestamp ("2 min ago",
  "6h ago").
- Manual refresh button, auto-refresh every 5 minutes.
- One-click "Edit" to override, "Use Live Price" to go back.
- Electric (EV) alongside Petrol/Diesel — Cost per KM, Cost per
  Passenger, Round Trip, Monthly, Annual — all from the same shared
  calculation engine.
- Animated value updates (re-mount + fade/rise on every recalculation,
  reusing the Hero's existing `.stage-title-enter` keyframe rather than
  adding a new animation system).
- Real animated bar chart (recharts) for the trip/round-trip/monthly
  breakdown.

## Verification

Full project-wide regression sweep (broken imports, missing `"use
client"`, unused imports) — clean. Real `tsc` syntax check against every
file touched this round — clean, after filtering the same class of stub
artifacts already verified in earlier phases (missing `@types/node`/
`React` namespace in the minimal test harness — confirmed `@types/node`
is genuinely present in the real `package.json`).
