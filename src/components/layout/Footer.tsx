/** @format */
"use client";

import { Mail, Phone, MapPin, ArrowUpRight, Crown } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 text-white pt-20 pb-10 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-16">
          
          {/* --- Brand & Newsletter --- */}
          <div className="lg:col-span-6 space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
               <Crown size={20} className="text-amber-500" />
               <span className="text-xl font-serif tracking-[0.2em] uppercase">
                 Luxe<span className="text-amber-500">Stay</span>
               </span>
            </Link>
            <p className="text-zinc-500 text-sm font-light max-w-sm">
              تجربة فندقية ملكية في قلب القاهرة، حيث تلتقي الفخامة بالراحة العالمية.
            </p>
            
            {/* Newsletter بسيط جداً */}
            <form className="relative max-w-xs pt-4">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full bg-transparent border-b border-white/10 py-2 outline-none focus:border-amber-500 transition-all font-light text-sm"
              />
              <button className="absolute right-0 top-6 text-zinc-500 hover:text-amber-500">
                <ArrowUpRight size={16} />
              </button>
            </form>
          </div>

          {/* --- Useful Links --- */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">
              Navigation
            </h4>
            <ul className="space-y-4">
              <li>
                <Link href="/rooms" className="text-sm text-zinc-500 hover:text-white transition-colors font-light">
                  Luxury Suites
                </Link>
              </li>
              <li>
                <Link href="/guide" className="text-sm text-zinc-500 hover:text-white transition-colors font-light">
                  Hotel Guide
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm text-zinc-500 hover:text-white transition-colors font-light">
                  Royal Dining
                </Link>
              </li>
            </ul>
          </div>

          {/* --- Contact Info --- */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">
              Contact
            </h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-zinc-500 group">
                <Phone size={14} className="group-hover:text-amber-500" />
                <span className="text-xs font-light">+20 123 456 789</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-500 group">
                <Mail size={14} className="group-hover:text-amber-500" />
                <span className="text-xs font-light">stay@luxestay.com</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-500 group">
                <MapPin size={14} className="group-hover:text-amber-500" />
                <span className="text-xs font-light">Cairo, Egypt</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- Bottom Line --- */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-zinc-600">
            © {currentYear} LuxeStay Sanctuary. All Rights Reserved.
          </p>
          <div className="flex items-center gap-2 text-[9px] text-zinc-700 tracking-widest uppercase">
            <span>Privacy</span>
            <span className="text-amber-900">|</span>
            <span>Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}