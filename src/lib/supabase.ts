// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'رابط_مشروعك_هنا';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'المفتاح_بتاعك_هنا';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);