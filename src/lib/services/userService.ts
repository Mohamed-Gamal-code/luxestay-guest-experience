// src/lib/services/userService.ts
import { supabase } from "../supabase";

export const getMyProfile = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;

  // جلب البيانات من الجدول
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();
  const googleImage = user.user_metadata?.avatar_url || user.user_metadata?.picture;
  
  return {
    ...profile,
    display_image: profile?.avatar_url || googleImage || null, 
    email: user.email,
    full_name: profile?.full_name || user.user_metadata?.full_name
  };
};