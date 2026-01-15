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
        <div className="p-4 pb-3 safe-area-bottom">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{landmark.icon}</span>
                <div>
                  <h3 className="text-base font-semibold text-foreground">{landmark.name}</h3>
                  <p className="text-xs text-muted-foreground">{hotels.length} hotels nearby</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full bg-white/5 active:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide snap-x snap-mandatory">
              {hotels.map((hotel, index) => {
                const safety = getSafetyBadge(hotel.districtSafetyScore);
                const arrondissement = getArrondissementById(hotel.arrondissement);
                
                return (
                  <motion.div
                    key={hotel.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hotel-card flex-shrink-0 min-w-[200px] snap-start"
                  >
                    <div className="h-24 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg mb-2 flex items-center justify-center">
                      <span className="text-3xl opacity-50">🏨</span>
                    </div>
                    
                    <h4 className="font-medium text-foreground text-xs mb-1 line-clamp-1">
                      {hotel.name}
                    </h4>
                    
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <div className="flex items-center gap-0.5 text-amber-400">
                        <Star className="w-2.5 h-2.5 fill-current" />
                        <span className="text-[10px]">{hotel.rating}</span>
                      </div>
                      <span className="text-muted-foreground text-[10px]">•</span>
                      <span className="text-muted-foreground text-[10px]">{arrondissement?.name.split(' - ')[0]}</span>
                    </div>

                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-0.5 text-muted-foreground">
                        <MapPin className="w-2.5 h-2.5" />
                        <span className="text-[10px]">{hotel.distance} km</span>
                      </div>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full flex items-center gap-0.5 ${safety.class}`}>
                        <Shield className="w-2.5 h-2.5" />
                        {hotel.districtSafetyScore}
                      </span>
                    </div>

                    <div className="flex items-baseline gap-0.5">
                      <span className="text-sm font-semibold text-foreground">€{hotel.pricePerNight}</span>
                      <span className="text-[10px] text-muted-foreground">/night</span>
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
