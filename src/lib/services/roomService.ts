import { supabase } from "@/lib/supabase";

/**
 * دالة إضافة غرفة جديدة (موجودة عندك بالفعل)
 */
export const addRoom = async (roomData: any, imageFile: File) => {
  try {
    // 1. رفع الصورة أولاً للـ Storage Bucket
    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `room-photos/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('room-images')
      .upload(filePath, imageFile);

    if (uploadError) throw uploadError;

    // 2. الحصول على رابط الصورة العام (Public URL)
    const { data: { publicUrl } } = supabase.storage
      .from('room-images')
      .getPublicUrl(filePath);

    // 3. حفظ بيانات الغرفة في جدول الـ SQL
    const { data, error } = await supabase
      .from('rooms')
      .insert([
        { 
          ...roomData, 
          image_url: publicUrl,
          is_featured: roomData.is_featured || false 
        }
      ]);

    if (error) throw error;
    return data;

  } catch (error) {
    console.error("Error adding room:", error);
    throw error;
  }
};

/**
 * دالة لجلب كل الغرف من قاعدة البيانات
 * مرتبة من الأحدث للأقدم
 */
export const getAllRooms = async () => {
  try {
    const { data, error } = await supabase
      .from('rooms')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching all rooms:", error);
    throw error;
  }
};
// ضيف دي في ملف roomService.ts
export const getRoomById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from('rooms')
      .select('*')
      .eq('id', id)
      .single(); // هاتي سجل واحد بس

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching room details:", error);
    return null;
  }
};
/**
 * دالة لجلب الغرف المميزة فقط (Featured)
 * بنستخدمها عشان نعرضها في سيكشن خاص في الصفحة الرئيسية
 */
export const getFeaturedRooms = async () => {
  try {
    const { data, error } = await supabase
      .from('rooms')
      .select('*')
      .eq('is_featured', true) // الفلترة هنا
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching featured rooms:", error);
    throw error;
  }
};