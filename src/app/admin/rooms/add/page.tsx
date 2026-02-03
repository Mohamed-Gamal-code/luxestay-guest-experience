"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"; // استيراد Image من Next.js
import { addRoom } from "@/lib/services/roomService";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  UploadCloud, 
  X, 
  Hotel, 
  DollarSign, 
  Users, 
  Star, 
  Type, 
  FileText,
  Loader2
} from "lucide-react";

export default function AddRoomPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  // الحالة (State) لتجميع البيانات بشكل منظم
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price_per_night: "",
    category: "Standard",
    capacity: 2,
    is_featured: false,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  // دالة معالجة الصورة ومعاينتها
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // دالة إرسال البيانات لسوبابيز
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile) {
      return alert("Please upload a room image first!");
    }

    setLoading(true);
    try {
      await addRoom(formData, imageFile);
      alert("Great job! The room has been added successfully. 🎊");
      router.push("/admin/rooms"); 
    } catch (error) {
      alert("Something went wrong. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 mb-20 font-sans">
      <Card className="shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[2.5rem] border-none overflow-hidden bg-white">
        <CardHeader className="bg-gray-50/50 border-b border-gray-100 p-8">
          <CardTitle className="text-3xl font-black text-gray-900 flex items-center gap-3">
            <Hotel className="h-8 w-8 text-black" />
            Add New <span className="text-zinc-400 font-light">Luxury Room</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-10">
            
            {/* Room Name & Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label htmlFor="name" className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                  <Type className="h-4 w-4" /> Room Name
                </Label>
                <Input
                  id="name"
                  required
                  placeholder="e.g. Royal Ocean Suite"
                  className="rounded-2xl h-14 border-gray-100 bg-gray-50 focus:bg-white transition-all px-6"
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="price" className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                  <DollarSign className="h-4 w-4" /> Price per Night
                </Label>
                <Input
                  id="price"
                  required
                  type="number"
                  placeholder="250"
                  className="rounded-2xl h-14 border-gray-100 bg-gray-50 focus:bg-white transition-all px-6"
                  onChange={(e) => setFormData({ ...formData, price_per_night: e.target.value })}
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <Label htmlFor="description" className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                <FileText className="h-4 w-4" /> Room Description
              </Label>
              <textarea
                id="description"
                required
                rows={4}
                placeholder="Describe why this room is special..."
                className="flex w-full rounded-2xl border border-gray-100 bg-gray-50 px-6 py-4 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-black transition-all"
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            {/* Category, Capacity & Featured */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
              <div className="space-y-3">
                <Label className="text-xs font-black uppercase tracking-widest text-gray-400">Category</Label>
                <select
                  className="flex h-14 w-full rounded-2xl border border-gray-100 bg-gray-50 px-6 text-sm focus:outline-none focus:ring-2 focus:ring-black transition-all appearance-none cursor-pointer"
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="Standard">Standard</option>
                  <option value="Suite">Suite</option>
                  <option value="Luxury">Luxury</option>
                </select>
              </div>
              
              <div className="space-y-3">
                <Label className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                  <Users className="h-4 w-4" /> Capacity
                </Label>
                <Input
                  type="number"
                  defaultValue={2}
                  className="rounded-2xl h-14 border-gray-100 bg-gray-50 px-6"
                  onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                />
              </div>

              <div className="flex items-center space-x-3 h-14 px-6 bg-amber-50/50 rounded-2xl border border-amber-100 transition-all hover:bg-amber-50">
                <input
                  type="checkbox"
                  id="featured"
                  className="w-5 h-5 accent-black cursor-pointer shadow-sm"
                  onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                />
                <Label htmlFor="featured" className="font-bold text-amber-800 cursor-pointer flex items-center gap-2">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" /> Featured Room
                </Label>
              </div>
            </div>

            {/* Image Upload Area */}
            <div className="space-y-4">
              <Label className="text-xs font-black uppercase tracking-widest text-gray-400">Room Portrait</Label>
              <div className="relative border-2 border-dashed border-gray-200 rounded-[2rem] p-4 text-center hover:border-black transition-all bg-gray-50 group min-h-[300px] flex items-center justify-center overflow-hidden">
                {preview ? (
                  <div className="relative w-full h-[300px]">
                    <Image 
                      src={preview} 
                      alt="Preview" 
                      fill 
                      className="object-cover rounded-2xl shadow-inner" 
                    />
                    <button 
                      type="button"
                      onClick={() => {setPreview(null); setImageFile(null);}}
                      className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-black w-10 h-10 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-xl z-10"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center group-hover:scale-105 transition-transform duration-300">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md mb-4 group-hover:bg-black group-hover:text-white transition-colors">
                      <UploadCloud className="h-10 w-10 text-gray-400 group-hover:text-inherit" />
                    </div>
                    <span className="text-gray-900 font-bold text-lg">Upload high-res photo</span>
                    <p className="text-gray-400 text-sm mt-1">Drag and drop or click to browse</p>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                  </label>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className={`w-full h-20 rounded-2xl font-black text-xl tracking-wide transition-all duration-300 shadow-2xl ${
                loading ? "bg-zinc-100 text-zinc-400 cursor-not-allowed" : "bg-black text-white hover:bg-zinc-800 hover:-translate-y-1 active:scale-95"
              }`}
            >
              {loading ? (
                <div className="flex items-center gap-3">
                  <Loader2 className="h-6 w-6 animate-spin" />
                  PUBLISHING TO CLOUD...
                </div>
              ) : (
                "PUBLISH PROPERTY"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}