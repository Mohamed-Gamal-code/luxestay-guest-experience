"use client";

import { ArrowRight, MousePointerClick } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[800px] w-full flex items-center justify-center overflow-hidden bg-zinc-950">
      {/* Background Image with subtle zoom & overlay */}
      <div className="absolute inset-0 z-0">
       <Image
            src="/images/HeroSection.avif" 
            alt="LuxeStay Luxury Suite"
            fill 
            priority 
            className="object-cover brightness-[0.65] scale-105 animate-slow-pan"
            sizes="100vw" 
        />
        {/* Stronger gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/50" />
      </div>

      {/* Main Content - Centered & Balanced */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12 text-center">
        {/* Subtle pre-title */}
        <div className="inline-flex items-center gap-4 mb-6 md:mb-10 opacity-0 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <div className="h-px w-10 md:w-16 bg-amber-400/60" />
          <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.4em] text-amber-300/90">
            Timeless Elegance
          </span>
          <div className="h-px w-10 md:w-16 bg-amber-400/60" />
        </div>

        {/* Main Headline - Refined & Not Overly Huge */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white tracking-tight leading-[0.9] mb-8 md:mb-12 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
          LuxeStay
          <span className="block mt-2 md:mt-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight italic text-amber-100/90">
            Where Luxury Meets Serenity
          </span>
        </h1>

        {/* Short, emotional description */}
        <p className="max-w-2xl mx-auto text-base md:text-lg text-zinc-300/90 font-light leading-relaxed mb-10 md:mb-16 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.7s" }}>
          Discover meticulously designed suites in the heart of Cairo, crafted for those who seek refined comfort, impeccable service, and unforgettable moments.
        </p>

        {/* Primary CTAs - Prominent & Contrasting */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 md:gap-8 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.9s" }}>
          <Link
            href="/rooms"
            className="group relative inline-flex items-center justify-center px-10 md:px-14 py-5 md:py-6 bg-amber-600 hover:bg-amber-500 text-white font-medium uppercase tracking-wider text-sm rounded-full overflow-hidden shadow-xl shadow-amber-900/30 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-3">
              Book Your Stay
              <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
            </span>
          </Link>

          <Link
            href="/guide"
            className="group inline-flex items-center gap-3 px-8 md:px-10 py-5 md:py-6 border border-white/30 text-white hover:bg-white/10 font-medium uppercase tracking-wider text-sm rounded-full transition-all duration-300 hover:border-amber-400/50 hover:text-amber-200"
          >
            Explore Experience
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Bottom Info Bar - Elegant & Subtle (Desktop only) */}
      <div className="absolute bottom-0 left-0 right-0 z-10 hidden md:flex justify-between items-end px-10 lg:px-20 pb-12 text-white/80 text-sm">
        <div className="flex gap-12 lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-300/70 mb-1">Check-in</p>
            <p className="font-medium">After 14:00</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-300/70 mb-1">Check-out</p>
            <p className="font-medium">Before 12:00</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-300/70 mb-1">Location</p>
            <p className="font-medium">Downtown Cairo</p>
          </div>
        </div>

        {/* Scroll Hint */}
        <div className="flex flex-col items-center gap-3">
          <MousePointerClick size={18} className="animate-bounce-slow" />
          <span className="text-xs uppercase tracking-widest font-medium opacity-70">Scroll to explore</span>
        </div>
      </div>

      {/* Animations */}
      <style jsx global>{`
        @keyframes slow-pan {
          0% { transform: scale(1.05) translate(0, 0); }
          50% { transform: scale(1.12) translate(-2%, 2%); }
          100% { transform: scale(1.05) translate(0, 0); }
        }
        .animate-slow-pan {
          animation: slow-pan 35s infinite alternate ease-in-out;
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 1.2s forwards;
        }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s forwards cubic-bezier(0.22, 1, 0.36, 1);
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
}