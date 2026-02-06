// components/Discover.tsx
"use client";

import TextOverlay from "@/components/TextOverlay";
import VideoReveal from "@/components/Videoreveal";

const Discover = () => {
  return (
    <section className="relative w-full bg-black">
      <TextOverlay />
      <VideoReveal />
    </section>
  );
};

export default Discover;