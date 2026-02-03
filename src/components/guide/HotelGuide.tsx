"use client";

import { 
  Utensils, 
  Dumbbell, 
  Car, 
  ConciergeBell, 
  Clock, 
  Sparkles, 
  ArrowRight 
} from "lucide-react";

interface GuideItem {
  title: string;
  description: string;
  time: string;
  icon: React.ReactNode;
  tag: string;
}

const GUIDE_ITEMS: GuideItem[] = [
  {
    title: "Fine Dining",
    description: "Exquisite seasonal menus prepared by our award-winning culinary team in an elegant setting.",
    time: "7:00 AM – 11:00 PM",
    icon: <Utensils size={32} strokeWidth={1.5} />,
    tag: "Gastronomy"
  },
  {
    title: "Elite Fitness",
    description: "Cutting-edge equipment, personal trainers, and wellness classes available any time.",
    time: "Open 24 Hours",
    icon: <Dumbbell size={32} strokeWidth={1.5} />,
    tag: "Wellness"
  },
  {
    title: "Private Transfers",
    description: "Luxury chauffeured service to and from Cairo International Airport.",
    time: "On Demand",
    icon: <Car size={32} strokeWidth={1.5} />,
    tag: "Transport"
  },
  {
    title: "Bespoke Concierge",
    description: "Personalized assistance for reservations, experiences, and any special request.",
    time: "24/7 Dedicated Support",
    icon: <ConciergeBell size={32} strokeWidth={1.5} />,
    tag: "Hospitality"
  }
];

export default function HotelGuide() {
  return (
    <section className="py-24 lg:py-32 bg-white dark:bg-zinc-950 px-5 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Header – أوضح وأقوى */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center justify-center gap-3 mb-5">
            <Sparkles className="h-5 w-5 text-amber-600 dark:text-amber-500" />
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-700 dark:text-amber-500">
              Signature Services
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-zinc-900 dark:text-white tracking-tight mb-5">
            Curated Hotel Experiences
          </h2>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            From exceptional dining to personalized assistance — every service is designed to make your stay effortless and memorable.
          </p>
        </div>

        {/* Grid الكروت – مسافات واضحة ونصوص مريحة */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 xl:gap-10">
          {GUIDE_ITEMS.map((item, index) => (
            <ServiceCard key={index} item={item} />
          ))}
        </div>

      </div>
    </section>
  );
}

function ServiceCard({ item }: { item: GuideItem }) {
  return (
    <article className="group relative bg-white dark:bg-zinc-900/70 rounded-3xl p-8 lg:p-10 border border-zinc-100 dark:border-zinc-800 hover:border-amber-200/40 dark:hover:border-amber-800/30 hover:shadow-xl hover:shadow-amber-100/10 dark:hover:shadow-amber-900/20 transition-all duration-400 flex flex-col h-full">
      
      {/* الأيقونة – أكبر وأوضح */}
      <div className="mb-8">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 transition-all duration-400 group-hover:scale-110 group-hover:bg-amber-100 dark:group-hover:bg-amber-900/50">
          {item.icon}
        </div>
      </div>

      {/* المحتوى الرئيسي – نصوص أكبر وأوضح */}
      <div className="flex-grow space-y-4">
        <span className="inline-block text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-500">
          {item.tag}
        </span>

        <h3 className="text-xl lg:text-2xl font-medium text-zinc-900 dark:text-white leading-tight group-hover:text-amber-800 dark:group-hover:text-amber-300 transition-colors">
          {item.title}
        </h3>

        <p className="text-sm lg:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
          {item.description}
        </p>
      </div>

      {/* السطر السفلي – وقت الخدمة واضح جدًا */}
      <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-sm">
        <div className="flex items-center gap-2.5 text-zinc-500 dark:text-zinc-400 group-hover:text-amber-700 dark:group-hover:text-amber-500 transition-colors">
          <Clock size={16} />
          <span className="font-medium">{item.time}</span>
        </div>

        <ArrowRight 
          size={18} 
          className="text-zinc-300 dark:text-zinc-600 group-hover:text-amber-600 dark:group-hover:text-amber-400 group-hover:translate-x-1 transition-all" 
        />
      </div>

      {/* لمسة hover خفيفة جدًا – مش مبالغة */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-50/30 to-transparent dark:from-amber-950/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </article>
  );
}