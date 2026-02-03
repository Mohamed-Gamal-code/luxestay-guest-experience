/** @format */
"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

/**
 * دالة إنشاء حجز جديد
 */
export async function createBooking(bookingData: {
  room_id: string;
  user_id: string;
  check_in: string;
  check_out: string;
  total_price: number;
}) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("bookings")
    .insert([
      {
        room_id: bookingData.room_id,
        user_id: bookingData.user_id,
        check_in: bookingData.check_in,
        check_out: bookingData.check_out,
        total_price: bookingData.total_price,
        status: "confirmed",
      },
    ])
    .select();

  if (error) {
    console.error("Supabase Error:", error.message);
    return { success: false, error: error.message };
  }

  // بنحدث مسار البروفايل عشان الحجز الجديد يظهر هناك فوراً
  revalidatePath("/profile");
  
  return { success: true, data };
}

/**
 * دالة إلغاء (حذف) حجز موجود
 * @param bookingId - الآيدي بتاع الحجز اللي عاوزين نحذفه
 */
export async function deleteBooking(bookingId: string) {
  const supabase = await createClient();

  // تنفيذ عملية الحذف من جدول bookings
  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    console.error("Delete Error:", error.message);
    return { success: false, error: error.message };
  }
  revalidatePath("/profile");

  return { success: true };
}