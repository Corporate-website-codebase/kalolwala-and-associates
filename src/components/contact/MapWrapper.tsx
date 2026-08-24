"use client";

import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css"; // Move CSS here so it only loads with the map

/* --------------------------------------------
   Fix Leaflet Icons
---------------------------------------------- */
function useLeafletIconFix() {
  useEffect(() => {
    // @ts-ignore
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "/mark.svg",
      iconUrl: "/mark.svg",
      shadowUrl: "/marker-shadow.png",
      iconSize: [35, 60],
      iconAnchor: [12, 41],
      shadowSize: [41, 41],
    });
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
   Interfaces
---------------------------------------------- */
interface LocationData {
  title: string;
  text: string;
  lat: number;
  lng: number;
}

interface MapWrapperProps {
  activeLocation: [number, number];
  locations: LocationData[];
  setActiveLocation: (loc: [number, number]) => void;
}

/* --------------------------------------------
   Main Wrapper
---------------------------------------------- */
export default function MapWrapper({ activeLocation, locations, setActiveLocation }: MapWrapperProps) {
  useLeafletIconFix();

  return (
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
  );
}