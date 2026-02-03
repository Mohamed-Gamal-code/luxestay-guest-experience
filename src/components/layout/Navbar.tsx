/** @format */

import { createClient } from "@/utils/supabase/server";
import NavbarClient from "./NavbarClient"; // استدعاء الملف الجديد

export default async function Navbar() {
  const supabase = await createClient();

  // 1. Check User & Role (شغل السيرفر زي ما هو)
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

  // بنبعت البيانات للمكون التفاعلي (Client Component)
  return <NavbarClient user={user} isAdmin={isAdmin} />;
}