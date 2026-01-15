import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { landmarks, arrondissements, Landmark, Arrondissement, getSafetyColor, getSafetyOpacity } from '@/data/parisData';
import { parisArrondissementsGeoJson } from '@/data/parisGeoJson';
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

    // Add arrondissement overlays
    parisArrondissementsGeoJson.features.forEach((feature) => {
      const arrondissement = arrondissements.find(a => a.id === feature.properties.id);
      if (!arrondissement) return;

      const color = getSafetyColor(arrondissement.safetyLevel);
      const opacity = getSafetyOpacity(arrondissement.safetyLevel);

      const layer = L.geoJSON(feature as GeoJSON.Feature, {
        style: {
          fillColor: color,
          fillOpacity: opacity,
          color: color,
          weight: 1,
          opacity: 0.6,
        },
      }).addTo(mapRef.current!);

      layer.on('click', () => {
        setSelectedLandmark(null);
        setSelectedArrondissement(arrondissement);
      });

      layer.on('mouseover', (e) => {
        e.target.setStyle({
          fillOpacity: opacity + 0.1,
          weight: 2,
        });
      });

      layer.on('mouseout', (e) => {
        e.target.setStyle({
          fillOpacity: opacity,
          weight: 1,
        });
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

    // Custom tooltip styles
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
        padding: 8px 12px !important;
        color: white !important;
        font-family: 'Inter', sans-serif !important;
        font-size: 12px !important;
        font-weight: 500 !important;
        backdrop-filter: blur(10px) !important;
      }
      .landmark-tooltip::before {
        border-top-color: rgba(0, 0, 0, 0.8) !important;
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
