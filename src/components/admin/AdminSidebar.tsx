"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  BedDouble, 
  CalendarCheck, 
  Users, 
  UserCog, 
  Settings, 
  History,
  ShieldCheck
} from 'lucide-react'

const adminLinks = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/rooms', label: 'Rooms', icon: BedDouble },
  { href: '/admin/bookings', label: 'Bookings', icon: CalendarCheck },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/staff', label: 'Staff', icon: UserCog }, // اختياري
  { href: '/admin/settings', label: 'Settings', icon: Settings },
  { href: '/admin/logs', label: 'Logs', icon: History }, // اختياري
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-20 h-[calc(100vh-5rem)] w-64 bg-white border-r border-slate-200 hidden md:flex flex-col p-4 z-40">
      {/* قسم العنوان الفرعي */}
      <div className="mb-6 px-4 py-3 bg-slate-50 rounded-xl border border-slate-100">
        <div className="flex items-center gap-2 text-amber-600 mb-1">
          <ShieldCheck size={16} />
          <span className="text-[10px] font-black uppercase tracking-widest">Control Panel</span>
        </div>
        <p className="text-xs text-slate-500 font-medium">Manage your hotel operations</p>
      </div>

      {/* روابط القائمة */}
      <nav className="flex-1 space-y-1">
        {adminLinks.map((link) => {
          const Icon = link.icon
          const isActive = pathname === link.href

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 group ${
                isActive 
                  ? 'bg-slate-900 text-white shadow-md shadow-slate-200' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Icon 
                size={20} 
                className={`${isActive ? 'text-amber-400' : 'text-slate-400 group-hover:text-slate-600'}`} 
              />
              {link.label}
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* تذييل الـ Sidebar */}
      <div className="mt-auto border-t border-slate-100 pt-4 px-4">
        <div className="flex items-center gap-3 p-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">System Online</span>
        </div>
      </div>
    </aside>
  )
}