import Image from "next/image";
import Logo from "@/components/ui/Logo";
import { COMPANY } from "@/lib/constants";

/**
 * Full-viewport cinematic loading screen.
 *
 * Uses LOGO 1 (IBEX VR) exclusively, per brand-hierarchy rule. The bus
 * silhouette below it draws itself in via SVG's `pathLength="1"`
 * normalization (each shape below sets `pathLength="1"` directly, so the
 * shared `.loader-draw` stroke-offset keyframe works uniformly across the
 * rects/circles without hand-computing perimeters), followed by a pulsing
 * headlight and an industrial light sweep across the silhouette. The
 * bottom bar is an intentionally *indeterminate* metallic shimmer, not a
 * fabricated percentage — there's no real asset-weight to report progress
 * against yet (that lands once Phase 3's actual 3D assets exist), and a
 * fake number would be less honest than a clean loading motif.
 */
export default function Loader() {
  return (
    <div
      className="fixed inset-0 z-loader flex flex-col items-center justify-center gap-8 bg-matte-black"
      role="status"
      aria-live="polite"
      aria-label="Loading IBEX Vehicle Restoration"
    >
      <div className="relative h-24 w-24 lg:h-28 lg:w-28">
        <Logo variant="primary" className="w-full h-full" priority />
      </div>

      {/* Bus silhouette — chassis/body/window/wheel line-draw + headlight + light sweep. */}
      <div className="relative w-48 overflow-hidden lg:w-64">
        <svg viewBox="0 0 200 90" fill="none" className="w-full" aria-hidden="true">
          <rect
            x="10"
            y="20"
            width="160"
            height="45"
            rx="10"
            stroke="#C9A24B"
            strokeWidth="2"
            pathLength="1"
            className="loader-draw"
          />
          <rect
            x="20"
            y="28"
            width="140"
            height="18"
            rx="4"
            stroke="#22D3E8"
            strokeWidth="1.5"
            pathLength="1"
            className="loader-draw loader-draw-delay-1"
          />
          <circle
            cx="45"
            cy="68"
            r="12"
            stroke="#F6F6F4"
            strokeWidth="2"
            pathLength="1"
            className="loader-draw loader-draw-delay-2"
          />
          <circle
            cx="155"
            cy="68"
            r="12"
            stroke="#F6F6F4"
            strokeWidth="2"
            pathLength="1"
            className="loader-draw loader-draw-delay-2"
          />
          <circle cx="174" cy="50" r="3.5" fill="#F6F6F4" className="loader-headlight" />
        </svg>

        {/* Industrial light sweep, masked to the silhouette's bounding area. */}
        <div
          className="loader-sweep pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent"
          aria-hidden="true"
        />
      </div>

      <div className="flex w-40 flex-col items-center gap-3 lg:w-48">
        <div className="loader-progress-track h-[2px] w-full rounded-full bg-white/10">
          <div className="loader-progress-fill" />
        </div>
        <p className="font-mono text-xs uppercase tracking-widest text-steel-grey-light">
          {COMPANY.shortName} — Loading&hellip;
        </p>
      </div>
    </div>
  );
}
