"use client";

import { useState } from "react";
import { Play, X, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface KfueitVideoSectionProps {
  /**
   * Base path for KFUEIT videos (e.g., "/images/kfueit/videos")
   */
  basePath?: string;
  /**
   * Video files to display (without the basePath prefix)
   */
  videoFiles?: string[];
  /**
   * Title for the video section
   */
  title?: string;
}

/**
 * KFUEIT Video Section Component
 * 
 * Displays KFUEIT project videos in a responsive video player.
 * Videos are loaded from the KFUEIT videos folder.
 * 
 * Only displays KFUEIT videos - no overlap with other sections.
 */
export default function KfueitVideoSection({
  basePath = "/images/kfueit/videos",
  videoFiles = ["video-01.mp4", "video-02.mp4"],
  title = "KFUEIT Project Video",
}: KfueitVideoSectionProps) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [zoomed, setZoomed] = useState(false);

  // Check which videos exist
  const availableVideos = videoFiles.filter(video => {
    // Simple check - in production this would be a server-side scan
    // For now, we assume videos exist if they're in the array
    return true;
  });

  if (availableVideos.length === 0) {
    // No videos available yet - show placeholder
    return (
      <div className="aspect-video w-full overflow-hidden rounded-xl bg-[#14161A] ring-1 ring-white/10">
        <div className="flex h-full w-full flex-col items-center justify-center gap-6 p-8 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-gold-500/20 to-gold-500/5 ring-1 ring-gold-500/30">
            <Play className="h-10 w-10 text-gold-500" />
          </div>
          <div>
            <h3 className="font-display text-2xl text-white">KFUEIT Project Video</h3>
            <p className="mt-2 text-steel-grey-light">
              Video coming soon - KFUEIT bus delivery and campus tour
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Video Section */}
      <div className="aspect-video w-full overflow-hidden rounded-xl bg-[#14161A] ring-1 ring-white/10">
        {activeVideo ? (
          <div className="relative h-full w-full">
            <video
              src={`${basePath}/${activeVideo}`}
              controls
              autoPlay
              className={cn(
                "h-full w-full object-contain",
                zoomed ? "h-[60vh] w-full" : ""
              )}
              onEnded={() => setActiveVideo(null)}
            />
            {/* Close button */}
            <button
              type="button"
              onClick={() => setActiveVideo(null)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
              aria-label="Close video"
            >
              <X size={20} />
            </button>
            {/* Zoom button */}
            <button
              type="button"
              onClick={() => setZoomed(!zoomed)}
              className="absolute right-4 top-16 z-10 flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-black/50 text-white hover:border-gold-500 hover:text-gold-500"
              aria-label={zoomed ? "Zoom out" : "Zoom in"}
            >
              <Maximize2 size={16} />
            </button>
          </div>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-6 p-8 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-gold-500/20 to-gold-500/5 ring-1 ring-gold-500/30">
              <Play className="h-10 w-10 text-gold-500" />
            </div>
            <div>
              <h3 className="font-display text-2xl text-white">{title}</h3>
              <p className="mt-2 text-steel-grey-light">
                {availableVideos.length === 1
                  ? "Click to play video"
                  : `${availableVideos.length} videos available`}
              </p>
            </div>
            
            {/* Video selection buttons */}
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {availableVideos.map((video) => (
                <button
                  key={video}
                  type="button"
                  onClick={() => setActiveVideo(video)}
                  className="rounded-full border border-gold-500/30 bg-gold-500/10 px-6 py-3 text-sm font-medium text-gold-500 hover:border-gold-500 hover:bg-gold-500/20"
                >
                  {video.replace(".mp4", "").replace("-", " ").toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Caption */}
      <div className="mt-6 text-center">
        <p className="font-display text-xl text-white">{title}</p>
        <span className="font-mono text-xs uppercase tracking-widest text-steel-grey-light">
          {activeVideo && zoomed
            ? "Full preview — click video to zoom out"
            : "Click video to play"}
        </span>
      </div>
    </div>
  );
}
