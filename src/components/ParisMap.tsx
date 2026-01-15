import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { landmarks, arrondissements, Landmark, Arrondissement, getSafetyColor } from '@/data/parisData';
import SafetyCard from './SafetyCard';
import HotelGallery from './HotelGallery';
import Header from './Header';
import LandmarkLegend from './LandmarkLegend';
import SafetyLegend from './SafetyLegend';

const ParisMap = () => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [selectedArrondissement, setSelectedArrondissement] = useState<Arrondissement | null>(null);
  const [selectedLandmark, setSelectedLandmark] = useState<Landmark | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  const handleLandmarkClick = (landmarkId: string) => {
    const landmark = landmarks.find(l => l.id === landmarkId);
    if (landmark && mapRef.current) {
      setSelectedArrondissement(null);
      setSelectedLandmark(landmark);
      mapRef.current.flyTo(landmark.position, 15, {
        duration: 1.5,
        easeLinearity: 0.25,
      });
    }
  };

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Initialize map
    mapRef.current = L.map(mapContainerRef.current, {
      center: [48.8566, 2.3522],
      zoom: 12,
      zoomControl: true,
      attributionControl: true,
    });

    // Add dark tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(mapRef.current);

    // Add arrondissement circles - minimal, non-obstructive
    arrondissements.forEach((arrondissement) => {
      const color = getSafetyColor(arrondissement.safetyLevel);
      const center = arrondissement.center as [number, number];
      
      // Create a small circle marker
      const circle = L.circleMarker(center, {
        radius: 12,
        fillColor: color,
        fillOpacity: 0.6,
        color: color,
        weight: 2,
        opacity: 0.9,
      }).addTo(mapRef.current!);

      // Add district number label
      const labelIcon = L.divIcon({
        html: `<div class="safety-circle-label">${arrondissement.id}</div>`,
        className: 'safety-circle-container',
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      const labelMarker = L.marker(center, { icon: labelIcon, interactive: true })
        .addTo(mapRef.current!);

      // Click handlers
      circle.on('click', () => {
        setSelectedLandmark(null);
        setSelectedArrondissement(arrondissement);
      });

      labelMarker.on('click', () => {
        setSelectedLandmark(null);
        setSelectedArrondissement(arrondissement);
      });
    });

    // Add landmark markers
    landmarks.forEach((landmark) => {
      const markerIcon = L.divIcon({
        html: `
          <div class="relative group cursor-pointer">
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/30 border-2 border-white/20 transition-transform active:scale-95">
              <span class="text-xl">${landmark.icon}</span>
            </div>
            <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-amber-500 rotate-45 -z-10"></div>
          </div>
        `,
        className: 'landmark-marker-container',
        iconSize: [40, 48],
        iconAnchor: [20, 48],
      });

      const marker = L.marker(landmark.position, { icon: markerIcon })
        .addTo(mapRef.current!);

      marker.on('click', () => {
        setSelectedArrondissement(null);
        setSelectedLandmark(landmark);
        mapRef.current?.flyTo(landmark.position, 15, {
          duration: 1.5,
          easeLinearity: 0.25,
        });
      });

      // Add tooltip
      marker.bindTooltip(landmark.name, {
        permanent: false,
        direction: 'top',
        offset: [0, -40],
        className: 'landmark-tooltip',
      });

      markersRef.current.push(marker);
    });

    // Custom styles
    const style = document.createElement('style');
    style.textContent = `
      .landmark-marker-container {
        background: transparent !important;
        border: none !important;
      }
      .landmark-tooltip {
        background: rgba(0, 0, 0, 0.8) !important;
        border: 1px solid rgba(255, 255, 255, 0.1) !important;
        border-radius: 8px !important;
        padding: 6px 10px !important;
        color: white !important;
        font-family: 'Inter', sans-serif !important;
        font-size: 11px !important;
        font-weight: 500 !important;
        backdrop-filter: blur(10px) !important;
      }
      .landmark-tooltip::before {
        border-top-color: rgba(0, 0, 0, 0.8) !important;
      }
      .safety-circle-container {
        background: transparent !important;
        border: none !important;
      }
      .safety-circle-label {
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Inter', sans-serif;
        font-size: 10px;
        font-weight: 600;
        color: white;
        text-shadow: 0 1px 3px rgba(0,0,0,0.8);
        cursor: pointer;
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      markersRef.current = [];
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div ref={mapContainerRef} className="absolute inset-0" />
      
      <Header />
      
      <LandmarkLegend onLandmarkClick={handleLandmarkClick} />
      
      {!selectedLandmark && <SafetyLegend />}
      
      <SafetyCard 
        arrondissement={selectedArrondissement} 
        onClose={() => setSelectedArrondissement(null)} 
      />
      
      <HotelGallery 
        landmark={selectedLandmark} 
        onClose={() => setSelectedLandmark(null)} 
      />
    </div>
  );
};

export default ParisMap;
