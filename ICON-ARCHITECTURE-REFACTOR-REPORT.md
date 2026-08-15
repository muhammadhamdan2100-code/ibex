# Icon Architecture Refactor — Report

## Root Cause

`CategoryGrid.tsx` is a Client Component (`"use client"`, since it uses
the `useScrollReveal` hook). Several Server Component pages — Manufacturing,
Custom Engineering, CSR, Company Credentials, and others — rendered
`<CategoryGrid categories={...} />` where each category object held a
raw lucide-react component reference in its `icon` field (e.g.
`icon: Bus`). A component reference isn't a plain serializable value, so
passing it as a prop across the Server→Client boundary throws at runtime:
*"Only plain objects can be passed to Client Components from Server
Components."*

This is a real Next.js App Router constraint, not a lint nitpick — and
not something my earlier static-analysis passes (TypeScript compiles,
import/export checks) could have caught, since it's a *runtime RSC
serialization rule*, not a type error. `tsc` has no concept of "this
prop crosses a Server/Client boundary" — the code type-checks perfectly
while still failing at runtime.

## What Was Refactored

Rather than patch the four reported pages, every `icon` field in every
`lib/data/*.ts` file was converted from a component reference to a
string key, and a single centralized registry resolves the string to a
component wherever it's actually rendered:

- **`lib/icons.ts`** (new) — `ICON_MAP: Record<IconName, LucideIcon>`,
  70 entries covering every icon used anywhere in the project, plus a
  `default` fallback and a `resolveIcon()` helper.
- **9 data files converted**: `catalog.ts`, `capabilities.ts`,
  `credentials.ts`, `csr.ts`, `global-vision.ts`, `government.ts`,
  `project-categories.ts`, `what-we-do.ts`, `nav-menu.ts`. Every
  `icon: Bus` became `icon: "bus"`; every `icon: LucideIcon` type
  became `icon: IconName`.
- **6 consuming components updated** to resolve the string via the
  registry instead of expecting an already-resolved component:
  `CategoryGrid`, `PlaceholderMedia` (prop renamed `icon` → `iconName`
  for clarity), `ContactOptions`, `MegaMenu`, and both of `Navbar`'s
  desktop/mobile menu renders.
- **8 page-level call sites fixed**: `solutions/page.tsx`,
  `solutions/[division]/page.tsx`, `solutions/[division]/[item]/page.tsx`,
  `projects/page.tsx`, `projects/[category]/page.tsx`,
  `custom-engineering/page.tsx`, `manufacturing/page.tsx`,
  `government/page.tsx` — each previously destructured `icon: Icon`
  assuming a pre-resolved component; now resolves via `ICON_MAP`.
- Two now-unused direct lucide-react imports removed (`Building2` in
  Custom Engineering, `Factory` in Manufacturing) once their pages
  switched to string-based icons.

## Scope Decision: Fixed Everywhere, Not Just the 4 Reported Pages

Only `CategoryGrid`'s usage was an actual *live* runtime error (it's the
only consumer that's genuinely a Client Component receiving the data as
a prop from a Server Component). `PlaceholderMedia`, `ContactOptions`,
and `nav-menu.ts`'s consumption via `Navbar` were not currently
triggering the error — `PlaceholderMedia` isn't a Client Component, and
`Navbar` already imports `nav-menu.ts` directly rather than receiving it
as a prop, so no serialization boundary was actually being crossed there.

They were converted anyway. The brief asked for a permanent architectural
fix, not a patch to the four broken pages — and "some data files store
component references, some don't, depending on which components happen
to currently be Client Components" is exactly the kind of inconsistency
that reintroduces this bug the next time someone adds `"use client"` to a
component that didn't need it before, or refactors how a page passes
data down. Making every `icon` field a string, everywhere, with one
registry as the single place components get resolved, removes the
possibility of this error recurring regardless of how the
Server/Client boundaries in this app move in the future.

## Verification

Full project-wide regression sweep (broken imports, missing `"use
client"`, unused imports) — clean, including the two lucide-react
imports that became unused mid-refactor and were caught by the same
sweep before shipping. Real `tsc` syntax check against all 23 files
touched — clean. Final direct grep confirms zero remaining `icon:
ComponentName` value assignments anywhere in `lib/data/`.

## Why This Is Better

- **Data stays data.** Every object in `lib/data/` is now a plain,
  JSON-serializable value — no functions, no component references. This
  is the correct shape for data regardless of RSC: it's also easier to
  eventually move any of this into a real CMS or database later, neither
  of which can store a function reference either.
- **One registry, one place to add an icon.** Adding a new icon anywhere
  in the app now means adding one line to `lib/icons.ts`, not importing
  it separately in every file that happens to need it.
- **Boundary-agnostic.** Because no data file holds a component
  reference, it no longer matters which consuming component is or isn't
  `"use client"`, or how that changes later — this class of error is
  structurally prevented, not avoided by carefully tracking which
  current call sites happen to be safe.
