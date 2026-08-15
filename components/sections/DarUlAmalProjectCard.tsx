"use client";

import Link from "next/link";
import Image from "next/image";
import darUlAmalLogo from "@/public/logos/dar ul amal.png";

export function DarUlAmalProjectCard() {
  return (
    <div className="group relative mx-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-gold-500/30 bg-[#1A1C20]/80 p-8 md:p-12 transition-all duration-500 ease-out hover:border-gold-500/60 hover:shadow-2xl hover:shadow-gold-500/15">
      {/* Subtle background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A1C20] via-[#14161A] to-[#0F1114]" />
      <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gold-500/5 blur-3xl transition-all duration-500 group-hover:bg-gold-500/10" />
      <div className="absolute -left-16 -bottom-16 h-64 w-64 rounded-full bg-teal-500/5 blur-3xl transition-all duration-500 group-hover:bg-teal-500/10" />
      
      {/* Content container */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* "A PROJECT BY" label */}
        <div className="mb-6">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-gold-500/90">
            A PROJECT BY
          </span>
        </div>

        {/* Dar Ul Amal Logo - Large and sharp */}
        <div className="mb-8 flex h-auto w-auto items-center justify-center overflow-hidden rounded-lg border-2 border-gold-500/30 bg-[#0F1114] px-8 py-6 transition-transform duration-500 group-hover:scale-105">
          <Image
            src={darUlAmalLogo}
            alt="Dar Ul Amal Human Rights Organization Pakistan"
            width={320}
            height={160}
            className="max-h-[160px] w-auto object-contain object-center"
            priority
            unoptimized
          />
        </div>

        {/* Organization Name */}
        <h3 className="font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
          DAR UL AMAL
        </h3>

        {/* Organization Description */}
        <p className="mt-3 max-w-xl text-sm font-medium text-steel-grey-light md:text-base">
          HUMAN RIGHTS ORGANIZATION PAKISTAN
        </p>

        {/* CSR Description */}
        <p className="mt-4 max-w-2xl text-xs font-light text-steel-grey-light/80 md:text-sm">
          IBEX Vehicle Restoration is an integrated project of Dar Ul Amal Human Rights Organization Pakistan
        </p>

        {/* Buttons Section */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {/* Visit Dar Ul Amal Button */}
          <Link
            href="https://www.dar-ul-amal.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn inline-flex items-center justify-center gap-2 rounded-lg bg-gold-500 px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-matte-black transition-all duration-300 hover:bg-gold-400 hover:shadow-lg hover:shadow-gold-500/30 active:scale-95"
          >
            Visit Dar Ul Amal
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </Link>

          {/* Explore Our CSR Button */}
          <Link
            href="/csr"
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn inline-flex items-center justify-center gap-2 rounded-lg border border-gold-500/30 bg-transparent px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-gold-500 transition-all duration-300 hover:border-gold-500/60 hover:bg-gold-500/10 active:scale-95"
          >
            Explore Our CSR
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </Link>
        </div>

        {/* Decorative separator */}
        <div className="mt-8 h-px w-32 bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
      </div>
    </div>
  );
}
