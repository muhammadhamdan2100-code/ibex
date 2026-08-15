"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { SEARCH_INDEX } from "@/lib/data/search-index";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Global search — client-side only, matching against `SEARCH_INDEX`
 * (assembled from the site's real data, see that file). Simple
 * token/substring matching rather than a fuzzy-search library: the
 * index is a few hundred short titles, so a heavier dependency wouldn't
 * meaningfully improve results but would add bundle weight.
 */
export default function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      // Focus on open, after the element has mounted.
      const id = requestAnimationFrame(() => inputRef.current?.focus());
      return () => cancelAnimationFrame(id);
    }
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return SEARCH_INDEX.filter((entry) => entry.title.toLowerCase().includes(q)).slice(0, 30);
  }, [query]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      className="fixed inset-0 z-modal flex items-start justify-center bg-matte-black/80 backdrop-blur-glass p-4 pt-24"
      onClick={onClose}
    >
      <div
        className="glass w-full max-w-xl rounded-lg border border-white/10 p-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
          <Search size={18} className="text-steel-grey-light" aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search services, vehicles, projects, gallery..."
            aria-label="Search the site"
            className="flex-1 bg-transparent text-sm text-white placeholder:text-white/35 outline-none"
          />
          <button type="button" onClick={onClose} aria-label="Close search" className="text-steel-grey-light hover:text-white">
            <X size={18} />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {query.trim() && results.length === 0 && (
            <p className="px-4 py-6 text-center text-sm text-steel-grey-light">No results for &ldquo;{query}&rdquo;.</p>
          )}
          {results.map((entry) => (
            <Link
              key={`${entry.group}-${entry.href}-${entry.title}`}
              href={entry.href}
              onClick={onClose}
              className="flex items-center justify-between gap-4 px-4 py-3 text-sm text-white/85 transition-colors hover:bg-white/5 hover:text-gold-500"
            >
              <span>{entry.title}</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-steel-grey-light">
                {entry.group}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
