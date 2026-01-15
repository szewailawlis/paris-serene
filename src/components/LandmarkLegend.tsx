import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { landmarks } from '@/data/parisData';

interface LandmarkLegendProps {
  onLandmarkClick: (landmarkId: string) => void;
}

const LandmarkLegend = ({ onLandmarkClick }: LandmarkLegendProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Show first 6 landmarks in legend
  const legendLandmarks = landmarks.slice(0, 6);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-14 right-3 z-[1000]"
    >
      {isExpanded ? (
        <div className="glass-card p-2 space-y-0.5 max-h-[60vh] overflow-y-auto">
          <button
            onClick={() => setIsExpanded(false)}
            className="w-full flex items-center justify-between px-2 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wider"
          >
            <span>Landmarks</span>
            <ChevronRight className="w-3 h-3 rotate-90" />
          </button>
          {landmarks.map((landmark) => (
            <button
              key={landmark.id}
              onClick={() => {
                onLandmarkClick(landmark.id);
                setIsExpanded(false);
              }}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg active:bg-white/10 transition-colors text-left"
            >
              <img 
                src={landmark.image} 
                alt={landmark.name}
                className="w-8 h-8 object-contain rounded"
              />
              <span className="text-xs text-foreground/80 line-clamp-1">{landmark.name}</span>
            </button>
          ))}
        </div>
      ) : (
        <button
          onClick={() => setIsExpanded(true)}
          className="glass-card p-2 flex items-center gap-1"
        >
          <div className="flex -space-x-2">
            {legendLandmarks.slice(0, 3).map((landmark) => (
              <img 
                key={landmark.id}
                src={landmark.image} 
                alt={landmark.name}
                className="w-6 h-6 object-contain rounded border border-white/10"
              />
            ))}
          </div>
          <ChevronRight className="w-3 h-3 text-muted-foreground ml-1" />
        </button>
      )}
    </motion.div>
  );
};

export default LandmarkLegend;
