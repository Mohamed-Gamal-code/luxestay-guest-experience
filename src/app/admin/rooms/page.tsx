"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Loader2, Hotel, AlertCircle } from 'lucide-react';

interface Room {
  id: string;
  name: string;
  price_per_night: number;
  category: string;
  image_url: string;
}

export default function AdminRoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRooms = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('rooms')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) setRooms(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleDelete = async (room: Room) => {
    if (!confirm(`Are you sure you want to permanently delete: ${room.name}?`)) return;

    try {
      const { error } = await supabase
        .from('rooms')
        .delete()
        .eq('id', room.id);

      if (error) {
        alert(`Error: ${error.message}`);
        return;
      }

      setRooms((prev) => prev.filter((r) => r.id !== room.id));
      alert("Property removed successfully! ✅");
    } catch (err) {
      alert("An unexpected error occurred.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 px-4 pt-15 pb-10 md:px-8 lg:px-12">
      {/* Header - متجاوب تماماً */}
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div >
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 flex items-center gap-3">
            <Hotel className="h-8 w-8 md:h-10 md:w-10 text-black" />
            Inventory
          </h1>
          <p className="mt-2 text-sm text-gray-500 font-medium">
            Manage and monitor your luxury hotel properties
          </p>
        </div>

        <Link href="/admin/rooms/add" className="w-full md:w-auto">
          <Button className="w-full md:w-auto bg-black hover:bg-zinc-800 text-white px-8 py-6 rounded-2xl font-bold shadow-xl transition-all flex items-center justify-center gap-2">
            <Plus className="h-5 w-5" /> Add New Room
          </Button>
        </Link>
      </div>

      {/* Table Container - مع خاصية السكرول للموبايل */}
      <div className="overflow-hidden rounded-[1.5rem] md:rounded-[2rem] border border-gray-200 bg-white shadow-xl">
        
        {loading ? (
          <div className="flex h-80 flex-col items-center justify-center gap-4">
            <Loader2 className="h-10 w-10 animate-spin text-gray-400" />
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest text-center px-4">Updating Database...</p>
          </div>
        ) : rooms.length === 0 ? (
          <div className="flex h-80 flex-col items-center justify-center gap-4 text-gray-400 p-6 text-center">
            <AlertCircle className="h-16 w-16 opacity-20" />
            <p className="text-xl font-light">No rooms found in your inventory.</p>
            <Link href="/admin/rooms/add">
              <Button variant="outline" className="mt-2 rounded-xl border-2">Add First Property</Button>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-6 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Property Details</th>
                  <th className="hidden sm:table-cell px-6 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Type</th>
                  <th className="px-6 py-5 text-right text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Rate</th>
                  <th className="px-6 py-5 text-right text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Actions</th>
                </tr>
              </thead>
              
              <tbody className="divide-y divide-gray-50 bg-white">
                {rooms.map((room) => (
                  <tr key={room.id} className="group hover:bg-gray-50/50 transition-all duration-200">
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-4">
                        <div className="relative h-12 w-12 md:h-16 md:w-16 flex-shrink-0 overflow-hidden rounded-xl md:rounded-2xl shadow-md border border-gray-100">
                          <Image
                            src={room.image_url || '/placeholder-room.jpg'}
                            alt={room.name}
                            fill
                            // هنا حل مشكلة التحذير - بنعرفه إن الصورة صغيرة
                            sizes="(max-width: 768px) 48px, 64px"
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            priority={false}
                          />
                        </div>
                        <div className="max-w-[120px] md:max-w-none truncate">
                          <div className="text-sm md:text-lg font-bold text-gray-900 leading-tight mb-1 truncate">{room.name}</div>
                          <div className="text-[9px] font-mono text-gray-400 uppercase">ID: {room.id.slice(0, 8)}</div>
                        </div>
                      </div>
                    </td>

                    {/* التصنيف يختفي في الشاشات الصغيرة جداً */}
                    <td className="hidden sm:table-cell px-6 py-6">
                      <span className="inline-flex items-center rounded-lg bg-zinc-100 px-3 py-1 text-[10px] font-bold uppercase text-zinc-500 border border-zinc-200">
                        {room.category}
                      </span>
                    </td>

                    <td className="px-6 py-6 text-right">
                      <div className="flex flex-col items-end">
                        <span className="text-base md:text-xl font-black text-gray-900">${room.price_per_night}</span>
                        <span className="hidden md:inline text-[9px] font-bold text-gray-400 uppercase">Per Night</span>
                      </div>
                    </td>

                    <td className="px-6 py-6 text-right">
                      <button
                        onClick={() => handleDelete(room)}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-50 p-2.5 md:px-5 md:py-2.5 text-sm font-bold text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 border border-red-100 shadow-sm"
                        title="Delete Room"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="hidden md:inline">Delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}