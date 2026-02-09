"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "leaflet/dist/leaflet.css";
import { useMap } from "react-leaflet";

/* --------------------------------------------
   Icons
---------------------------------------------- */
const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

gsap.registerPlugin(ScrollTrigger);

/* --------------------------------------------
   React Leaflet Dynamic Imports
---------------------------------------------- */
const MapContainer = dynamic(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((m) => m.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((m) => m.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((m) => m.Popup),
  { ssr: false }
);
const Tooltip = dynamic(
  () => import("react-leaflet").then((m) => m.Tooltip),
  { ssr: false }
);

/* --------------------------------------------
   FIX LEAFLET ICONS
---------------------------------------------- */
function useLeafletIconFix() {
  useEffect(() => {
    (async () => {
      const L = await import("leaflet");
      // @ts-ignore
      delete L.Marker.prototype._getIconUrl;
      L.Marker.prototype.options.icon = L.icon({
        iconRetinaUrl: "/mark.svg",
        iconUrl: "/mark.svg",
        shadowUrl: "/marker-shadow.png",
        iconSize: [35, 60],
        iconAnchor: [12, 41],
        shadowSize: [41, 41],
      });
    })();
  }, []);
}

/* --------------------------------------------
   Fly To Component
---------------------------------------------- */
function MapFly({ position }: { position: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    if (map) map.flyTo(position, 14, { duration: 1.2 });
  }, [position, map]);
  return null;
}

/* --------------------------------------------
   Location Data
---------------------------------------------- */
const locations = [
  {
    title: "Kolkata",
    text: `South City Business Park 
770, Eastern Metropolitan 
Bypass, Anandapur, 
Adarsha Nagar,
Kolkata : 700107`,
    lat: 22.521344803173267,
    lng: 88.40114688107688,
  },
  {
    title: "Mumbai",
    text: `1507, Marathon Millennium,
Lal Bahadur Shastri Marg,
Beside Nirmal Lifestyle Mall,
Mulund West, Mumbai,
Maharashtra 400080`,
    lat: 19.167500397436367,
    lng: 72.93838505921735,
  },
  {
    title: "Gurugram",
    text: `Unit no - 150, 1st Floor,
Centrum Plaza,
Golf Course Road,
Sector -53, Gurugram,
Haryana 122002`,
    lat: 28.433941498367545,
    lng: 77.10422986130831,
  },
  {
    title: "Hyderabad",
//     text: `1st Floor, Workafella Western Pearl,
// Hitech City Rd, Kondapur,
// Hyderabad, Telangana 500084`,
text: `1st Floor, 
Workafella Western Pearl,
Hitech City Rd, 
Kondapur,Hyderabad, 
Telangana 500084`,
    lat: 17.458297209966894,
    lng: 78.37347767482315,
  },
  {
    title: "Bengaluru",
//     text: `1st Floor, Anthill IQ,
// 20, Cunningham Rd,
// Vasanth Nagar, Bengaluru,
// Karnataka 560001`,
text: `1st Floor, 
Anthill IQ,
20, Cunningham Rd,
Vasanth Nagar, Bengaluru,
Karnataka 560001`,
    lat: 12.98506227772602,
    lng: 77.59730170515094,
  },
];

/* --------------------------------------------
   MAIN COMPONENT
---------------------------------------------- */
export default function LetsTalk() {
  useLeafletIconFix();

  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null); // 1. Added Ref for Map


  const [activeLocation, setActiveLocation] = useState<[number, number]>([
    locations[0].lat,
    locations[0].lng,
  ]);

  /* --------------------------------------------
      GSAP Animations
  ---------------------------------------------- */
  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const grid = gridRef.current;

    if (!content || !section) return;

    const heading = content.querySelector("h1");
    const contactInfo = content.querySelector(".contact-info");
    // We target the children of the grid directly
    const cards = grid ? gsap.utils.toArray(grid.children) : [];

    const tl = gsap.timeline({ paused: true });

    // 1. Heading
    if (heading) {
      tl.fromTo(
        heading,
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
    }

    // 2. Contact Info
    if (contactInfo) {
      tl.fromTo(
        contactInfo,
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.6"
      );
    }

    // 3. Grid Cards (Animating them FROM opacity 0)
    if (cards.length > 0) {
      tl.fromTo(
        cards,
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" },
        "-=0.6"
      );
    }

    ScrollTrigger.create({
      trigger: section,
      start: "top 75%",
      onEnter: () => tl.play(),
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const handleLocationClick = (lat: number, lng: number) => {
    setActiveLocation([lat, lng]);
    // Smooth scroll to the map, centered in the viewport
    mapRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };


  return (
    <div className="py-12 bg-black">
      <section
        ref={sectionRef}
        className="w-full min-h-screen text-white marginal bg-black relative"
      >
        <div ref={contentRef} className="mx-auto pt-38">

          {/* TITLE */}
          <h1 className="opacity-0 text-[#F4C016] font-thin text-[clamp(32px,4.4vw,60px)] mb-8 leading-tight">
            Drop by our office
          </h1>

          {/* CONTACT INFO */}
          <div className="contact-info opacity-0 flex flex-col md:flex-row gap-6 md:gap-12 mb-14 text-base md:text-lg border-b border-white/10 pb-8">
            <a
              href="mailto:info@kalolwala.com"
              className="group flex items-center gap-3 hover:text-[#F4C016] transition-colors"
            >
              <div className="p-2.5 bg-zinc-800 rounded-full group-hover:bg-[#F4C016]/20 transition-colors">
                <MailIcon />
              </div>
              <span className="font-medium tracking-wide">info@kalolwala.com</span>
            </a>

            <a
              href="tel:03340077794"
              className="group flex items-center gap-3 hover:text-[#F4C016] transition-colors"
            >
              <div className="p-2.5 bg-zinc-800 rounded-full group-hover:bg-[#F4C016]/20 transition-colors">
                <PhoneIcon />
              </div>
              <span className="font-medium tracking-wide">033 4007 7794</span>
            </a>
          </div>

          {/* 🌟 CARDS GRID */}
          {/* REMOVED 'opacity-0' from this container to fix visibility issue */}
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
            {locations.map((loc, i) => {
              const isActive =
                activeLocation[0] === loc.lat && activeLocation[1] === loc.lng;

              return (
                <div
                  key={i}
                  onClick={() => handleLocationClick(loc.lat, loc.lng)}
                  // ADDED 'opacity-0' here so they animate in individually
                  className={`
                    opacity-0 
                    group p-6 rounded-xl cursor-pointer transition-all duration-300 border h-full flex flex-col justify-between min-h-[160px]
                    ${isActive
                      ? "bg-[#F4C016]/10 border-[#F4C016] shadow-[0_0_20px_rgba(244,192,22,0.1)]"
                      : "bg-zinc-900/50 border-white/10 hover:bg-zinc-800 hover:border-white/20"
                    }
                  `}
                >
                  <h3
                    className={`
                      text-[clamp(14px,1.2vw,16px)] font-bold uppercase tracking-widest mb-3 transition-colors
                      ${isActive ? "text-[#F4C016]" : "text-white group-hover:text-[#F4C016]"}
                    `}
                  >
                    {loc.title}
                  </h3>

                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed whitespace-pre-line group-hover:text-gray-200 transition-colors">
                    {loc.text}
                  </p>
                </div>
              );
            })}
          </div>

          {/* 🌍 MAP */}
          <div
                      ref={mapRef} 
 className="w-full h-[350px] md:h-[450px] lg:h-[550px] rounded-xl overflow-hidden shadow-2xl border border-white/10 relative z-0">
            <MapContainer
              center={activeLocation}
              zoom={12}
              scrollWheelZoom
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />

              <MapFly position={activeLocation} />

              {locations.map((loc, i) => (
                <Marker
                  key={i}
                  position={[loc.lat, loc.lng]}
                  eventHandlers={{
                    click: () => setActiveLocation([loc.lat, loc.lng]),
                  }}
                >
                  <Tooltip
                    direction="top"
                    offset={[0, -50]}
                    permanent
                    opacity={1}
                    className="!bg-white !border-none text-black font-semibold shadow-xl rounded-md px-3 py-1"
                  >
                    K&A, {loc.title}
                  </Tooltip>

                  <Popup className="text-black font-sans">
                    <span className="font-bold">K&A, {loc.title}</span>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </section>
    </div>
  );
}