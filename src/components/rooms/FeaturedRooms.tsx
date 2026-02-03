"use client";

import { useEffect, useState } from "react";
import { getFeaturedRooms } from "@/lib/services/roomService";
import RoomCard from "@/components/rooms/RoomCard";
import { Loader2, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function FeaturedRooms() {
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRooms() {
      try {
        const data = await getFeaturedRooms();
        const featuredOnly = data.filter((r: any) => r.is_featured === true);
        setRooms(featuredOnly.slice(0, 3));
      } catch (err) {
        console.error("Error fetching featured rooms:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchRooms();
  }, []);

  if (loading) {
    return (
      <div className="py-32 flex flex-col items-center justify-center gap-5 bg-gradient-to-b from-white to-amber-50/30">
        <div className="relative">
          <Loader2 className="h-12 w-12 animate-spin text-amber-600" />
          <Sparkles className="absolute -top-1 -right-1 h-5 w-5 text-amber-400 animate-pulse" />
        </div>
        <p className="text-amber-800/70 text-sm font-medium tracking-wide">
          Preparing Our Signature Suites...
        </p>
      </div>
    );
  }

  if (rooms.length === 0) return null;

  return (
    <section className="py-20 md:py-28 px-5 sm:px-8 lg:px-12 bg-gradient-to-b from-white via-amber-50/20 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 gap-8">
          <div className="space-y-4 md:space-y-5">
            <div className="flex items-center gap-3 text-amber-700/80">
              <Sparkles className="h-5 w-5 text-amber-500" />
              <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.35em] text-amber-600/90">
                Signature Collection
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-zinc-900 tracking-tight">
              Featured <span className="font-medium italic text-amber-700">Suites</span>
            </h2>

            <div className="h-1 w-24 bg-gradient-to-r from-amber-500 to-amber-300 rounded-full" />
          </div>

          <Link
            href="/rooms"
            className="group inline-flex items-center gap-3 px-7 py-4 bg-amber-600 hover:bg-amber-700 text-white font-medium uppercase tracking-wider text-sm rounded-full shadow-md shadow-amber-200/40 hover:shadow-lg hover:shadow-amber-300/50 transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
          >
            View All Suites
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 xl:gap-12">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="group relative overflow-hidden rounded-2xl shadow-lg shadow-zinc-200/40 hover:shadow-2xl hover:shadow-amber-200/30 transition-all duration-500 hover:-translate-y-2"
            >
              <RoomCard room={room} />
            </div>
          ))}
        </div>

        {/* Optional subtle CTA at bottom for mobile */}
        <div className="mt-16 text-center md:hidden">
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-800 font-medium text-sm transition-colors"
          >
            Discover More Suites <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}