import React from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export default function MapView({ coords, distance }) {
  const center = coords[0] || [28.6315, 77.2167];

  return (
    <div className="flex flex-col h-full bg-slate-800 border border-slate-700 rounded-2xl p-4 shadow-xl">
      <div className="flex items-center justify-between pb-3 border-b border-slate-700">
        <span className="text-sm font-semibold text-slate-200">Route Map</span>
        <span className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded font-mono">
          {distance} km
        </span>
      </div>
      <div className="flex-1 mt-3 rounded-xl overflow-hidden min-h-[380px]">
        <MapContainer center={center} zoom={11} scrollWheelZoom={false}>
          <TileLayer
            attribution="© OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {coords.length === 2 && (
            <>
              <Marker position={coords[0]} />
              <Marker position={coords[1]} />
              <Polyline 
                positions={coords} 
                pathOptions={{ color: '#10b981', weight: 4, dashArray: '6, 6' }} 
              />
            </>
          )}
        </MapContainer>
      </div>
    </div>
  );
}