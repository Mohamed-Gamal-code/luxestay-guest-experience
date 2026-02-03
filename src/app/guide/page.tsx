"use client";

import { 
  Utensils, Dumbbell, Car, ConciergeBell, 
  Wifi, ShieldCheck, Clock, Waves, 
  MapPin, PhoneCall, ArrowRight 
} from "lucide-react";
import Link from "next/link";

const categories = [
  {
    name: "Dining & Drinks",
    items: [
      { 
        title: "Main Restaurant", 
        time: "7:00 AM – 11:00 PM", 
        desc: "International buffet and refined à la carte options in an elegant atmosphere.", 
        icon: <Utensils size={28} strokeWidth={1.5} /> 
      },
      { 
        title: "Sky Bar", 
        time: "5:00 PM – 2:00 AM", 
        desc: "Signature cocktails and panoramic views of the city skyline.", 
        icon: <Waves size={28} strokeWidth={1.5} /> 
      },
    ]
  },
  {
    name: "Wellness & Leisure",
    items: [
      { 
        title: "Infinity Pool", 
        time: "8:00 AM – 8:00 PM", 
        desc: "Heated rooftop pool with breathtaking city vistas.", 
        icon: <Waves size={28} strokeWidth={1.5} /> 
      },
      { 
        title: "Elite Gym", 
        time: "24 Hours", 
        desc: "Latest Technogym equipment and personal training available.", 
        icon: <Dumbbell size={28} strokeWidth={1.5} /> 
      },
    ]
  },
  {
    name: "Guest Services",
    items: [
      { 
        title: "Valet Parking", 
        time: "24 Hours", 
        desc: "Secure and complimentary parking with valet service.", 
        icon: <Car size={28} strokeWidth={1.5} /> 
      },
      { 
        title: "Concierge", 
        time: "24 Hours", 
        desc: "Personalized support for tours, reservations, and special requests.", 
        icon: <ConciergeBell size={28} strokeWidth={1.5} /> 
      },
    ]
  }
];

export default function HotelGuidePage() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950">
      
      {/* Hero Section – أنظف وأوضح */}
      <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden bg-zinc-900">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1566073771259-6a8506099945')] bg-cover bg-center opacity-35 scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <span className="text-xs md:text-sm font-medium uppercase tracking-[0.4em] text-amber-400/90 mb-5 block">
            The Sanctuary Experience
          </span>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white tracking-tight leading-none mb-6">
            Hotel Guide
          </h1>

          <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-white/70 text-xs md:text-sm font-medium">
            <span className="flex items-center gap-2"><Wifi size={16} /> Complimentary High-Speed WiFi</span>
            <span className="flex items-center gap-2"><ShieldCheck size={16} /> 24/7 Security</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20">
          
          {/* Sidebar – Left Column (Sticky) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit space-y-8">
            <div>
              <h2 className="text-3xl lg:text-4xl font-light text-zinc-900 dark:text-white tracking-tight mb-5">
                Your Stay, Elevated.
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-base">
                Everything you need to know about our services, facilities, and how to make the most of your time with us.
              </p>
            </div>

            <div className="p-6 lg:p-8 bg-amber-50/40 dark:bg-amber-950/20 rounded-3xl border border-amber-100/50 dark:border-amber-900/30">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center text-amber-700 dark:text-amber-400">
                  <PhoneCall size={24} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-500 mb-1">
                    Front Desk
                  </p>
                  <p className="text-base font-medium text-zinc-900 dark:text-white">
                    Dial '0' from your room
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Services – Right Column */}
          <div className="lg:col-span-8 space-y-20 lg:space-y-28">
            {categories.map((cat, idx) => (
              <div key={idx} className="space-y-10">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-amber-700 dark:text-amber-500 flex items-center gap-6">
                  {cat.name}
                  <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                  {cat.items.map((item, i) => (
                    <div 
                      key={i} 
                      className="group p-8 lg:p-10 bg-white dark:bg-zinc-900/60 rounded-3xl border border-zinc-100 dark:border-zinc-800 hover:border-amber-200/40 dark:hover:border-amber-800/30 hover:shadow-xl hover:shadow-amber-100/10 transition-all duration-400 flex flex-col"
                    >
                      <div className="mb-6">
                        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 group-hover:scale-110 transition-transform duration-300">
                          {item.icon}
                        </div>
                      </div>

                      <h4 className="text-xl lg:text-2xl font-medium text-zinc-900 dark:text-white mb-3 group-hover:text-amber-800 dark:group-hover:text-amber-300 transition-colors">
                        {item.title}
                      </h4>

                      <p className="text-sm lg:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6 font-light">
                        {item.desc}
                      </p>

                      <div className="mt-auto flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-amber-700 dark:group-hover:text-amber-500 transition-colors">
                        <Clock size={16} />
                        <span className="font-medium">{item.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}