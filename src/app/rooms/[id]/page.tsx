/** @format */
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getRoomById } from "@/lib/services/roomService";
import Image from "next/image";
import Link from "next/link";
import { 
  Loader2, ArrowLeft, Users, BedDouble, Maximize, 
  Wifi, Coffee, Tv, Wind, ShieldCheck, ChevronRight, Star,
  CheckCircle2, Sparkles
} from "lucide-react";

// تعريف الـ Type لضمان Clean Code
interface Room {
  id: string;
  name: string;
  image_url: string;
  category: string;
  price_per_night: number;
  description?: string;
}

export default function RoomDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRoom() {
      if (!params.id) return;
      try {
        const data = await getRoomById(params.id as string);
        setRoom(data);
      } catch (err) {
        console.error("Error fetching room:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchRoom();
  }, [params.id]);

  const handleBookingRedirect = () => {
    if (room) {
      router.push(`/checkout/${room.id}`);
    }
  };

  if (loading) return <LoadingSkeleton />;
  if (!room) return <NotFoundState />;

  return (
    <main className="min-h-screen bg-[#fafafa] pt-28 pb-24 text-slate-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Navigation & Back Button */}
        <div className="flex items-center justify-between mb-10">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-400 hover:text-amber-700 transition-all group font-bold text-[10px] uppercase tracking-[0.2em]"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Collection
          </button>
          
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full">
            <Sparkles size={14} />
            Available for Booking
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* العمود الأيسر: الصور والمعلومات التفصيلية */}
          <section className="lg:col-span-7 space-y-12">
            {/* معرض الصور الفخم */}
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200 aspect-[4/3] lg:aspect-[16/10]">
              <Image
                src={room.image_url || "/images/placeholder-room.jpg"}
                alt={room.name}
                fill
                className="object-cover transition-transform duration-[3s] hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* تفاصيل التجربة */}
            <div className="space-y-8 bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <div className="flex items-center gap-2 text-amber-500">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-current" />)}
                <span className="text-[10px] font-bold text-slate-400 ml-2 uppercase tracking-widest">Unmatched Luxury</span>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-serif font-bold">The Royal Experience</h3>
                <p className="text-slate-500 leading-relaxed text-lg italic">
                  "{room.description || "Step into a world where elegance meets comfort. Every detail of this suite is meticulously crafted to provide an unparalleled sanctuary for our most discerning guests."}"
                </p>
              </div>

              {/* أيقونات المواصفات بشكل جديد */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-slate-50">
                <AmenityDetail icon={Wifi} label="Gigabit WiFi" />
                <AmenityDetail icon={Coffee} label="Artisan Coffee" />
                <AmenityDetail icon={Wind} label="Pure Air System" />
                <AmenityDetail icon={Tv} label="Cinema Display" />
              </div>
            </div>
          </section>

          {/* العمود الأيمن: كارت الحجز (Sticky Card) */}
          <section className="lg:col-span-5 sticky top-32">
            <div className="bg-white rounded-[3rem] p-10 shadow-2xl shadow-slate-200 border border-slate-100 relative overflow-hidden">
              {/* تزيين خلفية الكارت */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-50 rounded-full blur-3xl opacity-50" />
              
              <div className="relative">
                <span className="inline-block bg-amber-100 text-amber-800 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
                  {room.category || "Luxury Suite"}
                </span>
                
                <h1 className="text-4xl lg:text-5xl font-serif text-slate-900 mb-6 leading-tight">
                  {room.name}
                </h1>

                {/* المواصفات السريعة بتنسيق أنيق */}
                <div className="flex items-center gap-6 mb-10 py-6 border-y border-slate-50">
                  <SpecItem icon={Users} label="2 Guests" />
                  <div className="h-8 w-[1px] bg-slate-100" />
                  <SpecItem icon={BedDouble} label="King Bed" />
                  <div className="h-8 w-[1px] bg-slate-100" />
                  <SpecItem icon={Maximize} label="45 m²" />
                </div>

                {/* السعر والزرار */}
                <div className="space-y-8">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Price Per Night</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-6xl font-black text-slate-950">${room.price_per_night}</span>
                        <span className="text-slate-400 font-bold uppercase text-xs">/USD</span>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={handleBookingRedirect}
                    className="w-full bg-slate-950 hover:bg-amber-600 text-white py-7 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-3 group"
                  >
                    RESERVE THIS SUITE
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <div className="space-y-4">
                    <Benefit icon={ShieldCheck} text="Best Price Guarantee" />
                    <Benefit icon={CheckCircle2} text="Free cancellation before 24h" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

// --- مكونات فرعية احترافية (Sub-components) ---

function SpecItem({ icon: Icon, label }: { icon: any, label: string }) {
  return (
    <div className="flex flex-col gap-1">
      <Icon className="h-4 w-4 text-amber-600" strokeWidth={2.5} />
      <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">{label}</span>
    </div>
  );
}

function AmenityDetail({ icon: Icon, label }: { icon: any, label: string }) {
  return (
    <div className="flex flex-col items-center p-6 bg-slate-50/50 rounded-2xl border border-slate-100 group hover:bg-white hover:shadow-md transition-all">
      <Icon className="h-6 w-6 text-slate-900 mb-3" strokeWidth={1.5} />
      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 group-hover:text-amber-600 transition-colors">{label}</span>
    </div>
  );
}

function Benefit({ icon: Icon, text }: { icon: any, text: string }) {
  return (
    <div className="flex items-center gap-3 text-slate-400">
      <Icon size={14} className="text-emerald-500" />
      <span className="text-[10px] font-bold uppercase tracking-wider">{text}</span>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-6">
      <div className="relative">
        <Loader2 className="h-10 w-10 animate-spin text-amber-600" />
        <div className="absolute inset-0 blur-xl bg-amber-200/50 animate-pulse" />
      </div>
      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 animate-pulse">Entering Sanctuary</p>
    </div>
  );
}

function NotFoundState() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
      <h2 className="text-4xl font-serif mb-6 italic">Sanctuary not found</h2>
      <Link href="/rooms" className="bg-slate-950 text-white px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-transform hover:scale-105">
        Return to Gallery
      </Link>
    </div>
  );
}