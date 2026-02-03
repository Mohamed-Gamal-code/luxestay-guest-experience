/** @format */
"use client"; // 👈 ده ضروري عشان نعرف مكاننا في الموقع

import Link from "next/link";
import { usePathname } from "next/navigation"; // 👈 دي اللي بتجيب الرابط الحالي
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
  BellRing,
  Map,
  Crown,
  ShieldCheck,
  Star,
  LayoutDashboard,
  ClipboardList,
  BedDouble,
} from "lucide-react";
import { signOutAction } from "@/app/(auth)/login/actions";

// استقبلنا بيانات اليوزر كـ Props من السيرفر
interface NavbarClientProps {
  user: any;
  isAdmin: boolean;
}

export default function NavbarClient({ user, isAdmin }: NavbarClientProps) {
  const pathname = usePathname();

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
            {/* بعتنا الـ pathname للينكات عشان تعرف هي active ولا لا */}
            <NavLink href="/" label="Home" currentPath={pathname} />
            <NavLink href="/rooms" label="Our Rooms" currentPath={pathname} />
            <NavLink href="/guide" label="Hotel Guide" currentPath={pathname} />
          </div>

          {/* --- RIGHT ACTIONS --- */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3 md:gap-6">
                {/* Admin Button ⭐ - النسخة الأنيقة */}
                {isAdmin && (
                  <Button
                    asChild
                    className="hidden md:flex bg-slate-900 hover:bg-slate-800 text-amber-400 hover:text-amber-300 rounded-full px-5 py-6 shadow-lg gap-2 transition-all hover:-translate-y-0.5 border border-amber-500/20"
                  >
                    <Link href="/admin/dashboard" className="flex items-center">
                      {/* أيقونة النجمة بتعبر عن التميز والأدمن */}
                      <Star
                        size={16}
                        fill="currentColor"
                        className="animate-pulse-subtle"
                      />
                      <span className="text-xs font-black uppercase tracking-[0.1em]">
                        Dashboard
                      </span>
                    </Link>
                  </Button>
                )}

                {/* User Service Button */}
                {/* زرار الحجز بدل Room Service */}
                {!isAdmin && (
                  <Button
                    asChild // استخدمنا asChild عشان نخليه Link
                    className="hidden md:flex bg-slate-900 hover:bg-slate-800 text-white rounded-full px-6 h-11 gap-2.5 shadow-lg shadow-slate-200 hover:shadow-amber-500/20 transition-all duration-300 border border-transparent hover:border-amber-500/30"
                  >
                    <Link href="/rooms">
                      {" "}
                      {/* بيوديك لصفحة الغرف اللي أنت مخلصها */}
                      <BellRing size={18} className="text-amber-400" />
                      <span className="text-xs font-bold uppercase tracking-wide">
                        Book Your Stay
                      </span>
                    </Link>
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
                          <LayoutDashboard size={18} /> Admin Dashboard
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
          {/* Home - زي ما هي */}
          <MobileNavLink
            href="/"
            icon={<LayoutDashboard size={24} />}
            label="Home"
            currentPath={pathname}
          />

          {/* Rooms - زي ما هي */}
          <MobileNavLink
            href="/rooms"
            icon={<BedDouble size={24} />}
            label="Rooms"
            currentPath={pathname}
          />

          {/* Center Action Button (Golden FAB) - التعديل هنا 👇 */}
          <div className="relative -top-7 flex flex-col items-center">
            <Link
              href={isAdmin ? "/admin/dashboard" : "/rooms"} // 👈 لو مش أدمن يوديه لصفحة الغرف فوراً
            >
              <div className="bg-slate-900 text-amber-400 w-16 h-16 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-slate-400 ring-[6px] ring-[#FBFBFB] active:scale-90 transition-all duration-300 group">
                {isAdmin ? (
                  <Star
                    size={28}
                    fill="currentColor"
                    className="group-hover:rotate-12 transition-transform"
                  />
                ) : (
                  /* 👈 غيرنا أيقونة المعالق بأيقونة جرس الخدمة الفندقية أو التاج */
                  <BellRing
                    size={26}
                    className="group-hover:swing-animation transition-transform text-amber-400"
                  />
                )}
              </div>
            </Link>
            <span className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400 mt-2">
              {isAdmin ? "Admin" : "Book Now"}{" "}
              {/* 👈 غيرنا كلمة Action لـ Book Now */}
            </span>
          </div>

          {/* My Stay / Guide */}
          <MobileNavLink
            href={!user ? "/login" : isAdmin ? "/admin/rooms" : "/guide"}
            // 👈 هنا بنغير الأيقونة بناءً على هل هو أدمن ولا يوزر عادي
            icon={
              isAdmin ? (
                <LayoutDashboard size={22} /> // أيقونة أنسب للـ Orders/Dashboard
              ) : (
                <Map size={22} /> // أيقونة الخريطة بتعبر جداً عن الـ Guide
              )
            }
            // 👈 هنا غيرنا النصوص زي ما طلبت بالظبط
            label={isAdmin ? "Dashboard" : "Guide"}
            currentPath={pathname}
          />

          {/* Profile */}
          <MobileNavLink
            href={user ? "/profile" : "/login"}
            icon={
              user ? (
                <div
                  className={`h-6 w-6 rounded-full overflow-hidden ring-2 transition-all ${
                    pathname === "/profile"
                      ? "ring-amber-500"
                      : "ring-slate-100"
                  }`}
                >
                  <img
                    src={
                      user.user_metadata?.avatar_url || "/default-avatar.png"
                    }
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <User size={22} />
              )
            }
            label={user ? "Profile" : "Login"}
            currentPath={pathname}
          />
        </div>
      </div>
    </>
  );
}

// --- Helper Components (Updated for Active State) ---

function NavLink({
  href,
  label,
  currentPath,
}: {
  href: string;
  label: string;
  currentPath: string;
}) {
  const isActive = currentPath === href;

  return (
    <Link
      href={href}
      className={`relative text-[13px] uppercase tracking-[0.2em] font-bold transition-colors py-2 group ${
        isActive ? "text-slate-900" : "text-slate-500 hover:text-slate-900"
      }`}
    >
      {label}
      {/* الخط الذهبي بيظهر لو isActive بـ true */}
      <span
        className={`absolute inset-x-0 bottom-0 h-[2px] bg-amber-500 transition-transform duration-300 ease-out origin-left ${
          isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
        }`}
      />
    </Link>
  );
}

function MobileNavLink({
  href,
  icon,
  label,
  currentPath,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  currentPath: string;
}) {
  const isActive = currentPath === href;

  return (
    <Link
      href={href}
      className={`flex flex-col items-center gap-1.5 transition-colors w-14 group ${
        isActive ? "text-amber-600" : "text-slate-400 hover:text-amber-600"
      }`}
    >
      <div className="group-active:scale-90 transition-transform duration-200">
        {icon}
      </div>
      <span
        className={`text-[9px] font-bold uppercase tracking-widest transition-opacity ${
          isActive ? "opacity-100" : "opacity-80 group-hover:opacity-100"
        }`}
      >
        {label}
      </span>
    </Link>
  );
}
