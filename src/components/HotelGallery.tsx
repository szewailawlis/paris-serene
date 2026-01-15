import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Star, Shield } from 'lucide-react';
import { Landmark, Hotel, getHotelsForLandmark, getArrondissementById } from '@/data/parisData';

interface HotelGalleryProps {
  landmark: Landmark | null;
  onClose: () => void;
}

const HotelGallery = ({ landmark, onClose }: HotelGalleryProps) => {
  if (!landmark) return null;

  const hotels = getHotelsForLandmark(landmark.id);

  const getSafetyBadge = (score: number) => {
    if (score >= 8) return { class: 'safety-badge-safe', label: 'Safe' };
    if (score >= 6) return { class: 'safety-badge-caution', label: 'Caution' };
    return { class: 'safety-badge-danger', label: 'Alert' };
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 left-0 right-0 z-[1000]"
      >
        <div className="glass-panel rounded-t-3xl">
          <div className="p-6 pb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{landmark.icon}</span>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{landmark.name}</h3>
                  <p className="text-sm text-muted-foreground">{hotels.length} hotels nearby</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide">
              {hotels.map((hotel, index) => {
                const safety = getSafetyBadge(hotel.districtSafetyScore);
                const arrondissement = getArrondissementById(hotel.arrondissement);
                
                return (
                  <motion.div
                    key={hotel.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="hotel-card flex-shrink-0"
                  >
                    <div className="h-32 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl mb-3 flex items-center justify-center">
                      <span className="text-4xl opacity-50">🏨</span>
                    </div>
                    
                    <h4 className="font-medium text-foreground text-sm mb-1 line-clamp-1">
                      {hotel.name}
                    </h4>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1 text-amber-400">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="text-xs">{hotel.rating}</span>
                      </div>
                      <span className="text-muted-foreground text-xs">•</span>
                      <span className="text-muted-foreground text-xs">{arrondissement?.name.split(' - ')[0]}</span>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        <span className="text-xs">{hotel.distance} km</span>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${safety.class}`}>
                        <Shield className="w-3 h-3" />
                        {hotel.districtSafetyScore}
                      </span>
                    </div>

                    <div className="flex items-baseline gap-1">
                      <span className="text-lg font-semibold text-foreground">€{hotel.pricePerNight}</span>
                      <span className="text-xs text-muted-foreground">/night</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default HotelGallery;
