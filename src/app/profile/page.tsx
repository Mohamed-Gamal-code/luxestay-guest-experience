/** @format */
import CancelBookingButton from "@/components/CancelBookingButton";
import { createClient } from "@/utils/supabase/server";
import { 
  User as UserIcon, 
  Calendar, 
  ShieldCheck, 
  ArrowLeft, 
  LogOut,
  MapPin,
  Crown,
  Star,
  Clock,
  History,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { signOutAction } from "@/app/(auth)/login/actions";
import Image from "next/image";

export default async function ProfilePage() {
  const supabase = await createClient();

  // 1. جلب بيانات المستخدم
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // 2. جلب بيانات البروفايل (الرتبة) والحجوزات
  const [{ data: profile }, { data: bookings }] = await Promise.all([
    supabase.from("profiles").select("role").eq("id", user.id).single(),
    supabase.from('bookings').select('*, rooms(name, category, image_url)').eq('user_id', user.id).order('created_at', { ascending: false })
  ]);

  const isAdmin = profile?.role === "admin";
  const userAvatar = user.user_metadata?.avatar_url || user.user_metadata?.picture;
  const fullName = user.user_metadata?.full_name || user.user_metadata?.name || "Royal Guest";

  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-24 text-slate-900 selection:bg-amber-100">
      {/* هيدر سينمائي */}
      <div className="h-[40vh] bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1571896349842-33c89424de2d')] bg-cover bg-center opacity-30 scale-105 blur-[2px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/60 to-slate-950"></div>
        <div className="max-w-7xl mx-auto px-6 pt-24 relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-amber-400 transition-all font-bold text-[10px] uppercase tracking-[0.3em] group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
            Back to Sanctuary
          </Link>
          <h1 className="text-white text-5xl font-black mt-8 tracking-tighter">Your <span className="text-amber-500">Residence.</span></h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* كارت المستخدم (الجانبي) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-slate-200/60 border border-white flex flex-col items-center text-center backdrop-blur-sm bg-white/90">
              <div className="relative mb-8 group">
                <div className="h-40 w-40 rounded-[2.5rem] overflow-hidden border-[8px] border-slate-50 shadow-inner rotate-3 group-hover:rotate-0 transition-transform duration-500">
                  {userAvatar ? (
                    <img src={userAvatar} alt="Profile" className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-300"><UserIcon size={64} /></div>
                  )}
                </div>
                <div className={`absolute -bottom-2 -right-2 p-3 rounded-2xl border-4 border-white shadow-xl ${isAdmin ? 'bg-amber-500' : 'bg-slate-900'} text-white`}>
                  {isAdmin ? <Star size={20} fill="currentColor" /> : <ShieldCheck size={20} />}
                </div>
              </div>

              <h2 className="text-3xl font-black text-slate-900 mb-1">{fullName}</h2>
              <p className="text-slate-400 font-medium text-sm mb-8 italic">{user.email}</p>

              <div className="w-full grid grid-cols-2 gap-4 mb-10">
                <div className="p-4 bg-slate-50 rounded-3xl border border-slate-100">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Rank</p>
                  <p className="text-xs font-bold text-slate-900">{isAdmin ? "Admin" : "Member"}</p>
                </div>
                <div className="p-4 bg-amber-50/50 rounded-3xl border border-amber-100">
                  <p className="text-[9px] font-black text-amber-600 uppercase tracking-widest mb-1">Points</p>
                  <p className="text-xs font-bold text-amber-700">1,250 XP</p>
                </div>
              </div>

              <form action={signOutAction} className="w-full">
                <button className="w-full flex items-center justify-center gap-3 p-5 bg-slate-950 text-white rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] hover:bg-red-600 transition-all hover:shadow-2xl hover:shadow-red-200 active:scale-95">
                  <LogOut size={16} /> Sign Out
                </button>
              </form>
            </div>
          </div>

          {/* قائمة الحجوزات */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-white shadow-xl shadow-slate-200/40 min-h-[600px]">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                    <History className="text-amber-500" /> Booking History
                  </h3>
                  <p className="text-slate-400 text-sm font-medium mt-1">Managed stays and upcoming reservations.</p>
                </div>
              </div>

              <div className="space-y-8">
                {bookings && bookings.length > 0 ? (
                  bookings.map((booking: any) => {
                    const isPast = new Date(booking.check_out) < new Date();
                    return (
                      <div key={booking.id} className={`group relative p-8 rounded-[2rem] border transition-all duration-500 ${isPast ? 'bg-slate-50/50 border-slate-100 grayscale-[0.5]' : 'bg-white border-slate-100 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-slate-200'}`}>
                        <div className="flex flex-col md:flex-row gap-8">
                          {/* صورة الغرفة مع تأثير */}
                          <div className="relative h-32 w-full md:w-40 rounded-2xl overflow-hidden shadow-lg">
                            {booking.rooms?.image_url && (
                              <img src={booking.rooms.image_url} alt="Room" className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700" />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                          </div>

                          <div className="flex-1 space-y-4">
                            <div className="flex items-center justify-between">
                              <span className={`text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-tighter shadow-sm ${isPast ? 'bg-slate-200 text-slate-500' : 'bg-emerald-500 text-white animate-pulse'}`}>
                                {isPast ? "Completed" : "Active Stay"}
                              </span>
                              <span className="text-[10px] font-bold text-slate-300">REF: {booking.id.slice(0, 8).toUpperCase()}</span>
                            </div>

                            <h4 className="text-2xl font-black text-slate-900 tracking-tight">{booking.rooms?.name}</h4>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div className="flex items-center gap-3 text-slate-500">
                                <div className="p-2 bg-slate-100 rounded-lg text-slate-400 group-hover:text-amber-600 transition-colors"><Calendar size={14} /></div>
                                <div className="flex flex-col">
                                  <span className="text-[10px] uppercase font-black text-slate-300">Timeline</span>
                                  <span className="text-xs font-bold">{new Date(booking.check_in).toLocaleDateString('en-GB')} - {new Date(booking.check_out).toLocaleDateString('en-GB')}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-3 text-slate-500">
                                <div className="p-2 bg-slate-100 rounded-lg text-slate-400 group-hover:text-amber-600 transition-colors"><MapPin size={14} /></div>
                                <div className="flex flex-col">
                                  <span className="text-[10px] uppercase font-black text-slate-300">Location</span>
                                  <span className="text-xs font-bold">Main Branch</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* التكلفة والإجراءات */}
                          <div className="flex flex-col md:items-end justify-between border-t md:border-t-0 pt-6 md:pt-0 border-slate-100">
                            <div className="text-right">
                               <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Total Value</p>
                               <p className="text-3xl font-black text-slate-900">${booking.total_price}</p>
                            </div>
                            
                            {/* لا نظهر زر الإلغاء لو الحجز انتهى */}
                            {!isPast && (
                              <div className="mt-4">
                                <CancelBookingButton bookingId={booking.id} />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="py-32 flex flex-col items-center justify-center text-center">
                    <div className="h-24 w-24 bg-slate-50 rounded-full flex items-center justify-center mb-8 border border-slate-100">
                      <Star className="text-slate-200" size={40} />
                    </div>
                    <h4 className="text-xl font-black text-slate-900 uppercase tracking-widest">No Stays Yet</h4>
                    <p className="text-slate-400 mt-2 mb-10 max-w-xs">Your royal journey hasn't started. Begin your experience today.</p>
                    <Link href="/rooms" className="group flex items-center gap-3 bg-amber-500 text-white px-10 py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-amber-200 hover:shadow-slate-200">
                      Explore Suites <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}