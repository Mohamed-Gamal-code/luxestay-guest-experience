/** @format */
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getRoomById } from "@/lib/services/roomService";
import { createBooking } from "@/lib/services/bookingAction";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import Link from "next/link";
import {
  Loader2,
  Calendar,
  ShieldCheck,
  ArrowLeft,
  Info,
  CreditCard,
  MapPin,
  Star,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Room {
  id: string;
  name: string;
  image_url: string;
  price_per_night: number;
  category?: string;
}

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const supabase = createClient();

  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [nights, setNights] = useState(0);

  useEffect(() => {
    async function fetchRoomData() {
      if (!params.id) return;
      try {
        const data = await getRoomById(params.id as string);
        setRoom(data);
        setTotalPrice(data.price_per_night);
      } catch (error) {
        toast.error("حدث خطأ في جلب بيانات الغرفة");
      } finally {
        setLoading(false);
      }
    }
    fetchRoomData();
  }, [params.id]);

  useEffect(() => {
    if (checkIn && checkOut && room) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const diffTime = end.getTime() - start.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));

      if (diffDays > 0) {
        setNights(diffDays);
        setTotalPrice(diffDays * room.price_per_night);
      } else {
        setNights(0);
        setTotalPrice(room.price_per_night);
      }
    }
  }, [checkIn, checkOut, room]);

  const handleConfirmBooking = async () => {
    if (!checkIn || !checkOut || nights <= 0) {
      toast.warning("من فضلك اختر تواريخ إقامة صحيحة");
      return;
    }

    try {
      setIsSubmitting(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        toast.error("يجب تسجيل الدخول لإتمام الحجز");
        router.push("/login");
        return;
      }

      const result = await createBooking({
        room_id: room!.id,
        user_id: user.id,
        check_in: checkIn,
        check_out: checkOut,
        total_price: totalPrice,
      });

      if (result.success) {
        toast.success("تم الحجز بنجاح! ننتظرك في فندقنا 🎉");
        router.push("/profile");
      } else {
        toast.error("فشل الحجز: " + result.error);
      }
    } catch (error) {
      toast.error("حدث خطأ غير متوقع");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <LoadingState />;
  if (!room) return <ErrorState />;

  return (
    <main className="min-h-screen bg-slate-50/50 pt-24 pb-20 text-slate-900">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">
            <Link href="/rooms" className="hover:text-amber-600 transition-colors">Rooms</Link>
            <ChevronRight size={12} />
            <Link href={`/rooms/${room.id}`} className="hover:text-amber-600 transition-colors">{room.name}</Link>
            <ChevronRight size={12} />
            <span className="text-slate-900">Checkout</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Booking Details & Payment Method */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* 1. Stay Details Section */}
            <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-amber-100 p-2 rounded-xl text-amber-700">
                    <Calendar size={20} />
                </div>
                <h2 className="text-xl font-bold tracking-tight">Stay Details</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Check-in Date</label>
                  <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none font-bold transition-all"
                  />
                  <p className="text-[10px] text-slate-400">Standard Check-in: 2:00 PM</p>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Check-out Date</label>
                  <input
                    type="date"
                    min={checkIn || new Date().toISOString().split("T")[0]}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none font-bold transition-all"
                  />
                   <p className="text-[10px] text-slate-400">Standard Check-out: 12:00 PM</p>
                </div>
              </div>
            </section>

            {/* 2. Payment Method Section (Pay at Hotel) */}
            <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 overflow-hidden relative">
              <div className="absolute top-0 right-0 bg-emerald-500 text-white px-4 py-1 text-[10px] font-black uppercase tracking-widest rounded-bl-xl">
                 No Deposit Required
              </div>
              
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-blue-100 p-2 rounded-xl text-blue-700">
                    <CreditCard size={20} />
                </div>
                <h2 className="text-xl font-bold tracking-tight">Payment Method</h2>
              </div>

              <div className="flex items-center gap-4 p-6 bg-slate-50 rounded-2xl border-2 border-emerald-500/30">
                <div className="bg-emerald-100 p-3 rounded-full text-emerald-600">
                    <CheckCircle size={24} />
                </div>
                <div>
                    <h3 className="font-bold text-slate-900">Pay at the Property</h3>
                    <p className="text-sm text-slate-500">You will pay during your stay at the hotel. No credit card required today.</p>
                </div>
              </div>

              <div className="mt-6 flex gap-4 text-xs text-slate-500 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                <ShieldCheck size={18} className="text-emerald-500 shrink-0" />
                <p>Your booking is protected. We will hold your room until 6:00 PM on the day of arrival.</p>
              </div>
            </section>
          </div>

          {/* Right Side: Order Summary Sticky Card */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden sticky top-28">
              
              {/* Room Snapshot */}
              <div className="relative h-48 w-full">
                <Image src={room.image_url} alt={room.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-6 text-white">
                    <p className="text-[10px] font-black uppercase tracking-widest text-amber-400 mb-1">{room.category || "Luxury Suite"}</p>
                    <h3 className="text-xl font-bold font-serif">{room.name}</h3>
                </div>
              </div>

              <div className="p-8">
                <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400 font-medium">Daily Rate</span>
                        <span className="font-bold">${room.price_per_night}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400 font-medium">Duration</span>
                        <span className="font-bold">{nights} Nights</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400 font-medium">Taxes & Fees</span>
                        <span className="text-emerald-600 font-bold uppercase text-[10px]">Included</span>
                    </div>
                </div>

                <div className="h-[1px] bg-slate-100 w-full mb-6" />

                <div className="flex justify-between items-end mb-8">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Total Amount</p>
                        <p className="text-4xl font-black text-slate-900">${totalPrice}</p>
                    </div>
                    <Info size={18} className="text-slate-300 mb-2 cursor-help" />
                </div>

                <Button
                  onClick={handleConfirmBooking}
                  disabled={isSubmitting}
                  className="w-full bg-slate-950 hover:bg-amber-600 text-white py-8 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] transition-all shadow-xl shadow-slate-200"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" /> : "Complete Reservation"}
                </Button>

                <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-emerald-600 tracking-tighter">
                        <CheckCircle size={14} /> Free Cancellation until 24h before
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-slate-400 tracking-tighter">
                        <MapPin size={14} /> Instant Confirmation
                    </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

// Sub-components
function ChevronRight({ size }: { size: number }) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>;
}

function LoadingState() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-4">
      <Loader2 className="animate-spin text-amber-600 h-10 w-10" />
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Verifying Booking Details...</p>
    </div>
  );
}

function ErrorState() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-6">
        <h2 className="text-2xl font-black uppercase tracking-tight">Suite Not Found</h2>
        <Link href="/rooms" className="bg-slate-950 text-white px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-widest">Return to Gallery</Link>
    </div>
  );
}