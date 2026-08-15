"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Loader from "@/components/ui/Loader";
import ScrollIndicator from "@/components/ui/ScrollIndicator";
import { useLenis } from "@/hooks/useLenis";

interface PageWrapperProps {
  children: React.ReactNode;
}

/**
 * Top-level client shell.
 *
 * Wires up the *presence* of Lenis for smooth scrolling and assembles the
 * persistent chrome (Loader, Navbar, ScrollIndicator, Footer) around
 * routed page content. The loader is shown briefly on first mount with no
 * real asset-progress tracking yet.
 *
 * `<main>` intentionally has no top padding: the Phase 2 navbar is
 * transparent at the top of the page (glass only appears after scrolling,
 * see `useScrollDirection`), so full-bleed content like the Hero needs to
 * render behind it. Every `<Section>`-based page still clears the navbar
 * fine on its own — `py-section-mobile`/`py-section-desktop` (5rem/8rem)
 * already meets or exceeds the navbar's 5rem height.
 */
export default function PageWrapper({ children }: PageWrapperProps) {
  const [loading, setLoading] = useState(true);
  useLenis();

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {loading && <Loader />}
      <ScrollIndicator />
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
