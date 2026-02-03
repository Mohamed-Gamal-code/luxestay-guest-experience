/** @format */

import HotelGuide from "@/components/guide/HotelGuide";
import HeroSection from "@/components/hero/HeroSection";
import FeaturedRooms from "@/components/rooms/FeaturedRooms";
export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturedRooms />
      <HotelGuide />
    </div>
  );
}
