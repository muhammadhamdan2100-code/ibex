# IBEX VEHICLE RESTORATION — Phase 7 Report
## Final Enterprise Completion, QA, Polish & Production Readiness

---

## 1. What Was Fixed

**Real company data wired in** — the biggest substantive change this
phase. Every "pending confirmation" placeholder this project has
carried since Phase 4/6 for these specific facts is now replaced with
the real value, because the real value was finally provided directly in
this phase's brief:

- CEO name (Qamar Bilal Nasir Al-Rai) → Government, Company Credentials, Contact
- SECP / NTN / STRN-GSTN / PNTN / PPRA registration numbers → Government page
- District (Rahim Yar Khan) → every address block site-wide
- Real phone, WhatsApp, primary + alternative email → `ContactOptions` and `EnterpriseCta` now use genuine `tel:`/`wa.me`/`mailto:` links, not routed-to-a-form placeholders
- CSR relationship reworded precisely to "integrated project of the parent organization" (Dar Ul Amal), 40% figure stated as **annual net profit**, exactly as given
- Added the CSR program areas newly named this phase (rescue vehicles, shelter homes, technical training, employment opportunities)
- New dedicated Manufacturing capability list (body fabrication, chassis integration, painting, anti-rust treatment, electrical systems, solar, GPS, CCTV, IoT, QA, testing)
- Custom Engineering capability list expanded (vehicle upgrades, engine/electrical modernization, engineering drawings, special-purpose engineering)
- Contact form's required fields updated to the brief's spec (Name, Email, Phone, Organization, Project Type, Message), enforced both client- and server-side
- Homepage title/description set to the brief's exact requested copy

**A real bug from the previous session, fixed properly this time:**
`noUncheckedIndexedAccess` (already set in the real `tsconfig.json` since
early phases) was never included in my own verification checks across
this whole project until your actual `npm run typecheck` output surfaced
it. Fixed the 6 files it flagged (`Hero.tsx`, `ManufacturingStageRig.tsx`,
`ParticleField.tsx`, `WeldingSparks.tsx`, `Container.tsx`,
`gallery.ts`) with the correct fix per case — a single safe fallback
constant where a component renders (`Hero.tsx`), non-null assertions in
hot per-frame paths where the surrounding math already guarantees the
index is in bounds (`ManufacturingStageRig.tsx`, `WeldingSparks.tsx`,
`gallery.ts`), a real `bufferAttribute` API fix for the newer
`@react-three/fiber` version (`args={[array, itemSize]}` instead of
separate `count`/`array`/`itemSize` props, confirmed against the
official R3F docs), and a narrowed `as` prop type on `Container` (no
call site anywhere used anything but the default `"div"`, so the
unrestricted `keyof JSX.IntrinsicElements` type — which collapses
`children` to `never` when intersected across void elements — was
narrowed to the actual container tags this component is used for).

**The ESLint crash** — confirmed as a real, currently-open bug tracked
by both the ESLint team (`eslint/eslint#20237`) and the Next.js team
(`vercel/next.js#85244`, officially confirmed), caused by newer ESLint
9.3x+ breaking `eslint-config-next`'s legacy `FlatCompat` bridge. Applied
the Next.js team's own recommended workaround: `"lint": "next lint"`
instead of invoking `eslint` directly, which resolves config differently
and avoids the circular reference.

**Then re-ran a corrected, full-project type check** — not just the 6
files the initial build flagged — using a stub harness that finally
matches the real `tsconfig.json` exactly (including
`noUncheckedIndexedAccess`), across all 106 project files. Found and
fixed nothing further; the only entries were exhaustively confirmed as
artifacts of the stub's necessarily-imprecise module declarations
(cross-validated against your actual build output, which did not report
any of them).

## 2. Pages Verified

Every page listed in the brief's audit checklist was checked for: broken
imports, missing `"use client"`, unused imports/dead code, and (this
round, newly) `noUncheckedIndexedAccess` compliance — Home, About, What
We Do, Solutions (hub + all 9 divisions + all 102 vehicle pages),
Manufacturing, Custom Engineering, Gallery, Collaborations, Projects (hub
+ all 11 categories), Fuel Calculator, Government, CSR, Company
Credentials, Contact, Request Consultation (Quotation).

## 3. Errors Found → Resolved

| Error | Root cause | Fix |
|---|---|---|
| `ERESOLVE` (react/postprocessing) | `@react-three/postprocessing@3.0.5` needs `react ^19.2.0` | `react`/`react-dom` → `^19.2.1` (also patches a critical, actively-exploited CVE present through 19.2.0) |
| `ERESOLVE` (three) | Same package also needs `three >=0.182.0` | `three`/`@types/three` → `^0.182.0` |
| 34 TypeScript errors | `noUncheckedIndexedAccess` never included in my prior checks | Fixed per-case, see above |
| ESLint circular JSON crash | Confirmed upstream ESLint 9.3x + `eslint-config-next` FlatCompat bug | `lint` script → `next lint` |
| RSC serialization error | Component references stored in plain data objects | Fixed project-wide in an earlier session (icon registry) — reconfirmed clean this round |

## 4. Dependency Changes (cumulative, this session)

| Package | Before | After |
|---|---|---|
| `react` / `react-dom` | `19.0.0` | `^19.2.1` |
| `next` | `16.0.0` | `^16.0.7` |
| `eslint-config-next` | `16.0.0` | `^16.0.7` |
| `three` / `@types/three` | `^0.170.0` | `^0.182.0` |
| `lint` script | `eslint .` | `next lint` |

No other dependency was touched. `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`, `postprocessing`, and every other package are unchanged.

## 5. Build Result

**I cannot claim `npm run build` succeeds from this session** — I don't
have a working `npm install` in this sandbox (registry access is
blocked at the network layer here), so nothing after your last pasted
output has been executed by me. What I can say precisely: every error in
your last real `npm run typecheck` / `npm run build` output has been
addressed with a verified, specific fix, and a corrected full-project
re-check (matching your real tsconfig exactly this time) found nothing
further. That is not the same as watching `npm run build` exit 0 myself.

**Please run, in order, and paste the output:**
```
npm run typecheck
npm run lint
npm run build
```

## 6. Remaining Issues Requiring External Credentials/Backend

- Contact/Quotation form submissions are validated and logged
  server-side but not yet delivered anywhere (no email provider API key
  exists in this project — the exact TODO comment marking where one
  plugs in is in `app/api/contact/route.ts` and `app/api/quotation/route.ts`).
- Live fuel price API — same reason, no API key exists; the fallback
  path (cache → manual entry) is real and functional in the meantime.
- Google Map uses the free no-API-key embed centered on the city/
  district; a precise office pin would need a Maps API key and an exact
  street address, neither of which exists yet.
- Government registrations for e-PAD Punjab and e-PAD Federal still have
  no number — only the registration type was ever named, in Phase 4.
