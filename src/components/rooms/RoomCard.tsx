import Image from "next/image";
import Link from "next/link";
import { Users, BedDouble, Maximize, ArrowUpRight } from "lucide-react";

interface Room {
  id: string;
  name: string;
  price_per_night: number;
  category: string;
  image_url: string;
  // ممكن تضيف حقول تانية لو موجودة: guests, bed_type, area ...
}

export default function RoomCard({ room }: { room: Room }) {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-lg shadow-zinc-200/40 hover:shadow-2xl hover:shadow-amber-200/30 border border-zinc-100/80 transition-all duration-500 ease-out flex flex-col h-full transform hover:-translate-y-2">
      
      {/* Image Section */}
      <div className="relative h-80 sm:h-72 lg:h-80 w-full overflow-hidden">
        <Image
          src={room.image_url || "/placeholder-room.jpg"}
          alt={room.name}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />

        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        {/* Price Badge + Arrow */}
        <div className="absolute bottom-5 left-5 right-5 flex justify-between items-center">
          <div className="bg-white/95 backdrop-blur-md px-5 py-3 rounded-2xl shadow-md border border-amber-100/50">
            <span className="text-2xl font-extrabold text-amber-700">${room.price_per_night}</span>
            <span className="text-xs font-semibold text-zinc-500 uppercase ml-1.5 tracking-wide">/night</span>
          </div>

          <div className="bg-amber-600/90 backdrop-blur-md p-3 rounded-full text-white opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 shadow-lg">
            <ArrowUpRight className="h-5 w-5" strokeWidth={2.5} />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-7 lg:p-8 flex flex-col flex-grow">
        <div className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-600/80 mb-2">
            {room.category || "Signature Suite"}
          </p>
          <h3 className="text-2xl lg:text-2.5xl font-semibold text-zinc-900 group-hover:text-amber-800 transition-colors duration-300 leading-tight">
            {room.name}
          </h3>
        </div>

        {/* Features Icons */}
        <div className="flex items-center gap-6 lg:gap-8 py-5 border-y border-zinc-100 mb-6 lg:mb-8">
          <div className="flex items-center gap-2 text-zinc-600">
            <Users className="h-4.5 w-4.5 text-amber-600/70" strokeWidth={2} />
            <span className="text-sm font-medium">2 Guests</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-600">
            <BedDouble className="h-4.5 w-4.5 text-amber-600/70" strokeWidth={2} />
            <span className="text-sm font-medium">King</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-600">
            <Maximize className="h-4.5 w-4.5 text-amber-600/70" strokeWidth={2} />
            <span className="text-sm font-medium">45 m²</span>
          </div>
        </div>

        {/* CTA Button */}
        <Link href={`/rooms/${room.id}`} className="mt-auto">
          <button className="w-full bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-800 hover:to-amber-700 text-white py-4.5 rounded-2xl font-semibold text-sm tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-amber-300/40 active:scale-[0.98] flex items-center justify-center gap-2 group/btn">
            View Suite Experience
            <ArrowUpRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </Link>
      </div>
    </div>
  );
}