/** @format */

import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LogOut,
  User,
  UtensilsCrossed,
  Crown,
  ShieldCheck,
  Star,
  LayoutDashboard,
  ClipboardList,
  BedDouble,
} from "lucide-react";
import { signOutAction } from "@/app/(auth)/login/actions";

export default async function Navbar() {
  const supabase = await createClient();

  // 1. Check User & Role
  const {
    data: { user },
  } = await supabase.auth.getUser();
  let isAdmin = false;

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    isAdmin = profile?.role === "admin";
  }

  return (
    <>
      {/* =======================
          DESKTOP NAVBAR
      ======================== */}
      <nav className="fixed top-0 z-[100] w-full bg-white/95 backdrop-blur-xl border-b border-slate-200/80 h-20 flex items-center transition-all duration-300">
        <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
          {/* --- LOGO --- */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-gradient-to-br from-amber-400 to-amber-600 p-2.5 rounded-xl text-white shadow-lg shadow-amber-200/50 group-hover:scale-105 transition-transform duration-300">
              <Crown
                size={24}
                strokeWidth={1.5}
                fill="currentColor"
                className="text-white/20"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight text-slate-900 font-serif leading-none">
                LuxeStay
              </span>
              <span className="text-[10px] font-bold text-amber-600 uppercase tracking-[0.25em] mt-0.5 ml-0.5">
                {isAdmin ? "Management" : "Royal Suites"}
              </span>
            </div>
          </Link>

          {/* --- CENTER LINKS (Desktop) --- */}
          <div className="hidden md:flex items-center gap-10">
            <NavLink href="/" label="Home" />
            <NavLink href="/rooms" label="Our Rooms" />
            <NavLink href="/guide" label="Hotel Guide" />
          </div>

          {/* --- RIGHT ACTIONS --- */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3 md:gap-6">
                {/* Admin Button ⭐ */}
                {isAdmin && (
                  <Button
                    asChild
                    className="hidden md:flex bg-slate-900 hover:bg-slate-800 text-amber-400 hover:text-amber-300 rounded-full px-6 py-6 shadow-xl gap-2.5 transition-all hover:-translate-y-0.5"
                  >
                    <Link href="/admin/dashboard">
                      <Star size={18} fill="currentColor" />
                      <span className="text-sm font-extrabold tracking-wide">
                        Admin Dashboard
                      </span>
                    </Link>
                  </Button>
                )}

                {/* User Service Button */}
                {!isAdmin && (
                  <Button className="hidden md:flex bg-slate-900 hover:bg-slate-800 text-white rounded-full px-6 h-11 gap-2.5 shadow-lg shadow-slate-200 hover:shadow-amber-500/20 transition-all duration-300 border border-transparent hover:border-amber-500/30">
                    <UtensilsCrossed size={18} className="text-amber-400" />
                    <span className="text-xs font-bold uppercase tracking-wide">
                      Room Service
                    </span>
                  </Button>
                )}

                <div className="h-8 w-[1px] bg-slate-200 mx-1 hidden md:block" />

                {/* User Profile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-3 outline-none group pl-2">
                      <div className="relative">
                        <Avatar className="h-11 w-11 border-[3px] border-white ring-2 ring-slate-100 group-hover:ring-amber-300 transition-all shadow-md">
                          <AvatarImage src={user.user_metadata?.avatar_url} />
                          <AvatarFallback className="bg-amber-100 text-amber-700 font-black text-lg">
                            {user.email?.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span
                          className={`absolute bottom-0.5 right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white ${
                            isAdmin ? "bg-amber-500" : "bg-green-500"
                          }`}
                        />
                      </div>
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="end"
                    className="w-64 mt-4 p-2 rounded-2xl shadow-2xl border-slate-100 bg-white/95 backdrop-blur-sm"
                  >
                    <div className="px-3 py-4 mb-2 bg-slate-50 rounded-xl border border-slate-100/50">
                      <div className="flex items-center gap-2 mb-1">
                        {isAdmin ? (
                          <ShieldCheck size={14} className="text-amber-600" />
                        ) : (
                          <Crown size={14} className="text-amber-500" />
                        )}
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          {isAdmin ? "Administrator" : "Verified Guest"}
                        </p>
                      </div>
                      <p className="text-sm font-bold text-slate-900 truncate">
                        {user.email}
                      </p>
                    </div>

                    {isAdmin && (
                      <DropdownMenuItem
                        asChild
                        className="py-3 px-3 rounded-xl cursor-pointer gap-3 text-amber-700 font-bold focus:bg-amber-50 focus:text-amber-800 mb-1"
                      >
                        <Link
                          href="/admin/dashboard"
                          className="flex items-center w-full"
                        >
                          <LayoutDashboard size={18} /> Admin Dashboard ⭐
                        </Link>
                      </DropdownMenuItem>
                    )}

                    <DropdownMenuItem
                      asChild
                      className="py-3 px-3 rounded-xl cursor-pointer gap-3 text-slate-600 hover:text-slate-900 focus:bg-slate-50 mb-1"
                    >
                      <Link
                        href="/profile"
                        className="flex items-center w-full"
                      >
                        <User size={18} /> My Profile
                      </Link>
                    </DropdownMenuItem>

                    {!isAdmin && (
                      <DropdownMenuItem
                        asChild
                        className="py-3 px-3 rounded-xl cursor-pointer gap-3 text-slate-600 hover:text-slate-900 focus:bg-slate-50 mb-1"
                      >
                        <Link
                          href="/my-stay"
                          className="flex items-center w-full"
                        >
                          <ClipboardList size={18} /> My Bookings
                        </Link>
                      </DropdownMenuItem>
                    )}

                    <DropdownMenuSeparator className="bg-slate-100 my-1" />

                    <form action={signOutAction} className="w-full">
                      <button className="w-full text-left">
                        <DropdownMenuItem className="py-3 px-3 rounded-xl cursor-pointer gap-3 font-bold text-red-600 focus:text-red-700 focus:bg-red-50 w-full">
                          <LogOut size={18} /> Sign Out
                        </DropdownMenuItem>
                      </button>
                    </form>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Button
                asChild
                className="rounded-full bg-slate-900 text-white hover:bg-slate-800 px-8 h-11 shadow-lg shadow-amber-500/10 border border-slate-800 hover:border-amber-500/50 transition-all duration-300 active:scale-95"
              >
                <Link href="/login">Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* =======================
          MOBILE BOTTOM NAV
      ======================== */}
      <div className="md:hidden fixed bottom-0 left-0 z-[100] w-full pb-safe">
        <div className="bg-white/95 backdrop-blur-xl border-t border-slate-200 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] px-6 h-[5.5rem] flex items-center justify-between pb-2">
          {/* Home */}
          <MobileNavLink
            href="/"
            icon={<LayoutDashboard size={24} />}
            label="Home"
          />

          {/* Rooms */}
          <MobileNavLink
            href="/rooms"
            icon={<BedDouble size={24} />}
            label="Rooms"
          />

          {/* Center Action Button (Golden FAB) - المحمي */}
          <div className="relative -top-8">
            <Link href={isAdmin ? "/admin/dashboard" : (user ? "/requests" : "/login")}>
              <div className="bg-slate-900 text-amber-400 w-16 h-16 rounded-full flex items-center justify-center shadow-xl shadow-slate-400/50 ring-4 ring-white active:scale-90 transition-transform cursor-pointer">
                {isAdmin ? (
                  <Star size={28} fill="currentColor" />
                ) : (
                  <UtensilsCrossed size={26} />
                )}
              </div>
            </Link>
          </div>

          {/* Bookings / Admin Orders */}
          <MobileNavLink
            href={!user ? "/login" : (isAdmin ? "/admin/bookings" : "/my-stay")}
            icon={<ClipboardList size={24} />}
            label={isAdmin ? "Orders" : "My Stay"}
          />

          {/* Profile */}
          <MobileNavLink
            href={user ? "/profile" : "/login"}
            icon={
              user ? (
                <User size={24} />
              ) : (
                <LogOut size={24} className="rotate-180" />
              )
            }
            label={user ? "Profile" : "Login"}
          />
        </div>
      </div>
    </>
  );
}

// --- Helper Components ---

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="relative text-[13px] uppercase tracking-[0.2em] font-bold text-slate-500 hover:text-slate-900 transition-colors py-2 group"
    >
      {label}
      <span className="absolute inset-x-0 bottom-0 h-[2px] bg-amber-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left" />
    </Link>
  );
}

function MobileNavLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center gap-1.5 text-slate-400 hover:text-amber-600 active:text-amber-600 transition-colors w-14 group"
    >
      <div className="group-active:scale-90 transition-transform duration-200">
        {icon}
      </div>
      <span className="text-[9px] font-bold uppercase tracking-widest opacity-80 group-hover:opacity-100">
        {label}
      </span>
    </Link>
  );
}