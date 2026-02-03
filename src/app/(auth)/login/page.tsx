/** @format */

"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { 
  Loader2, 
  Crown, 
  ShieldCheck, 
  ChevronRight,
  Star
} from "lucide-react";
import Image from "next/image";

// Google Icon Component
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    const supabase = createClient();
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error("Login error:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#020617] pt-20">
      
      {/* الخلفية السينمائية مع طبقة تظليل */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/LoginPage.jpg" 
          alt="Luxury Hotel Lobby"
          fill
          priority
          className="object-cover opacity-30 grayscale-[0.3]"
        />
        {/* Gradient Overlay for richness */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/80 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/10 via-[#020617]/60 to-[#020617]" />
      </div>

      {/* الكارت العائم */}
      <div className="relative z-10 w-full max-w-[420px] px-6">
        
        <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.8)] relative overflow-hidden group">
          
          {/* لمعة خفيفة بتتحرك في الخلفية */}
          <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:animate-[shimmer_2s_infinite] pointer-events-none" />

          {/* محتوى الفورم */}
          <div className="relative z-10 space-y-10">
            
            {/* 1. قسم الشعار (نفس ستايل الـ Navbar) */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="relative group/logo cursor-default">
                {/* توهج خلف اللوجو */}
                <div className="absolute inset-0 bg-amber-500/30 blur-2xl rounded-full opacity-50 group-hover/logo:opacity-100 transition-opacity duration-700" />
                
                {/* اللوجو نفسه */}
                <div className="relative bg-gradient-to-br from-amber-400 to-amber-600 p-3.5 rounded-2xl shadow-xl shadow-amber-900/40 transform transition-transform duration-500 group-hover/logo:scale-105">
                  <Crown className="h-8 w-8 text-white/90" strokeWidth={1.5} />
                </div>
              </div>

              <div className="space-y-1">
                <h1 className="text-3xl font-serif font-bold text-white tracking-tight">
                  LuxeStay
                </h1>
                <div className="flex items-center justify-center gap-2">
                  <div className="h-[1px] w-6 bg-gradient-to-r from-transparent to-amber-500/50" />
                  <p className="text-amber-400 text-[10px] uppercase tracking-[0.25em] font-bold">
                    Royal Suites
                  </p>
                  <div className="h-[1px] w-6 bg-gradient-to-l from-transparent to-amber-500/50" />
                </div>
              </div>
            </div>

            {/* 2. نصوص الترحيب */}
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-medium text-white/90">Welcome Back</h2>
              <p className="text-slate-400 font-light text-sm leading-relaxed">
                Sign in to access your premium dashboard and manage your bookings.
              </p>
            </div>

            {/* 3. زر جوجل */}
            <div className="space-y-4">
              <Button
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full h-14 bg-white hover:bg-slate-50 text-slate-900 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 shadow-lg shadow-black/20 group/btn border-b-4 border-slate-200 active:border-b-0 active:translate-y-1"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin text-slate-400" />
                ) : (
                  <>
                    <GoogleIcon />
                    <span className="font-bold tracking-tight text-sm">Continue with Google</span>
                    <ChevronRight className="h-4 w-4 text-slate-300 group-hover/btn:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </div>

            {/* 4. قسم الحماية (Footer Badge) */}
            <div className="pt-8 border-t border-white/5">
                <div className="flex items-center justify-center gap-3 px-4 py-3 bg-white/5 rounded-xl border border-white/5">
                   <ShieldCheck className="h-4 w-4 text-amber-500" />
                   <div className="flex flex-col text-left">
                     <span className="text-[10px] text-white/90 font-bold uppercase tracking-wider">Secure Access</span>
                     <span className="text-[9px] text-slate-500">Encrypted via SSL Protocol</span>
                   </div>
                </div>
            </div>

          </div>
        </div>

        {/* روابط الفوتر السفلية */}
        <div className="mt-8 flex justify-center gap-8 text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">
          <span className="hover:text-amber-400 transition-colors cursor-pointer">Privacy</span>
          <span className="hover:text-amber-400 transition-colors cursor-pointer">Terms</span>
          <span className="hover:text-amber-400 transition-colors cursor-pointer">Contact</span>
        </div>
      </div>
    </div>
  );
}