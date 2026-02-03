/** @format */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, Sparkles, Home, AlertCircle } from "lucide-react";

// استيراد الخدمات والمكونات
import { getAllRooms } from "@/lib/services/roomService";
import RoomCard from "@/components/rooms/RoomCard";

interface Room {
  id: string;
  name: string;
  image_url: string;
  price_per_night: number;
  category: string | null;
}

export default function AllRoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const data = await getAllRooms();
        setRooms(data || []);
      } catch (err) {
        setError("Unable to load our collection at this moment.");
        console.error("Room Fetching Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorState message={error} />;

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 pt-20 sm:pt-28 pb-16 lg:pb-32">
      {/* Container مرن يتغير عرضه حسب الشاشة */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* رأس الصفحة - Responsive Alignment */}
        <PageHeader count={rooms.length} />

        {/* عرض المحتوى - تحسين الـ Grid ليكون أكثر مرونة */}
        {rooms.length === 0 ? (
          <EmptyRoomsState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
            {rooms.map((room, index) => (
      <div
                key={room.id}
                className="animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <RoomCard room={{
                  ...room,
                  category: room.category || "Luxury Suite"
                }} />
              </div>
            ))}
          </div>
        )}

        <BottomNavigation show={rooms.length > 0} />
      </div>
    </main>
  );
}

// --- المكونات الفرعية المنظمة ---

function PageHeader({ count }: { count: number }) {
  return (
    <header className="mb-12 lg:mb-20 text-center md:text-left">
      <div className="inline-flex items-center gap-3 mb-6 px-4 py-1.5 rounded-full bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 transition-all">
        <Sparkles className="h-3.5 w-3.5 text-amber-600" />
        <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-amber-800 dark:text-amber-500">
          The Suite Collection
        </span>
      </div>

      {/* تحجيم الخط حسب الشاشة (Responsive Font Sizes) */}
      <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif text-zinc-900 dark:text-white mb-6 tracking-tight leading-[1.1]">
        All Luxury <span className="italic text-amber-700">Suites</span>
      </h1>

      <p className="text-base sm:text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed mx-auto md:mx-0">
        Experience the pinnacle of luxury. Each suite is a masterpiece of
        design, offering breathtaking views and unmatched comfort.
      </p>

      <div className="mt-8 flex items-center justify-center md:justify-start gap-4">
        <div className="hidden sm:block h-px w-12 bg-amber-200" />
        <span className="text-[10px] sm:text-xs font-semibold text-zinc-400 uppercase tracking-widest">
          {count} Available Options
        </span>
      </div>
    </header>
  );
}

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-zinc-950 px-6">
      <div className="relative h-16 w-16 sm:h-20 sm:w-20">
        <Loader2
          className="h-full w-full animate-spin text-amber-600/20"
          strokeWidth={1}
        />
        <Loader2
          className="h-full w-full animate-spin text-amber-600 absolute top-0 left-0"
          strokeWidth={1.5}
          style={{ animationDuration: "3s" }}
        />
      </div>
      <p className="mt-6 text-[10px] sm:text-sm font-medium text-amber-800 dark:text-amber-500 uppercase tracking-[0.2em] animate-pulse text-center">
        Preparing your experience...
      </p>
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
      <h2 className="text-xl font-semibold mb-4">{message}</h2>
      <button
        onClick={() => window.location.reload()}
        className="px-6 py-2 bg-zinc-900 text-white rounded-full text-sm font-bold hover:bg-amber-800 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}

function EmptyRoomsState() {
  return (
    <div className="text-center py-16 sm:py-24 bg-zinc-50 dark:bg-zinc-900/50 rounded-[30px] sm:rounded-[40px] border border-zinc-100 dark:border-zinc-800 px-6">
      <h2 className="text-xl sm:text-3xl font-light text-zinc-400 mb-8">
        Our collection is currently being curated.
      </h2>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-8 py-4 bg-amber-800 text-white rounded-full hover:bg-amber-900 transition-all shadow-lg text-sm font-bold"
      >
        <Home size={18} /> Back to Sanctuary
      </Link>
    </div>
  );
}

function BottomNavigation({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <footer className="mt-16 sm:mt-24 text-center">
      <Link
        href="/"
        className="group inline-flex items-center gap-3 text-zinc-400 hover:text-amber-700 transition-all"
      >
        <span className="hidden sm:block h-px w-8 bg-zinc-200 group-hover:w-12 group-hover:bg-amber-700 transition-all" />
        <span className="text-[10px] sm:text-sm font-bold uppercase tracking-widest">
          Return to Home
        </span>
        <Sparkles className="h-4 w-4" />
      </Link>
    </footer>
  );
}
