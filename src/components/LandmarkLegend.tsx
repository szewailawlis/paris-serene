import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface LandmarkLegendProps {
  onLandmarkClick: (landmarkId: string) => void;
}

const landmarks = [
  { id: 'eiffel', icon: '🗼', name: 'Eiffel' },
  { id: 'louvre', icon: '🏛️', name: 'Louvre' },
  { id: 'arc', icon: '🏛️', name: 'Arc' },
  { id: 'notre-dame', icon: '⛪', name: 'Notre Dame' },
  { id: 'sacre-coeur', icon: '⛪', name: 'Sacré-Cœur' },
];

const LandmarkLegend = ({ onLandmarkClick }: LandmarkLegendProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-14 right-3 z-[1000]"
    >
      {isExpanded ? (
        <div className="glass-card p-2 space-y-0.5">
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
              <span className="text-base">{landmark.icon}</span>
              <span className="text-xs text-foreground/80">{landmark.name}</span>
            </button>
          ))}
        </div>
      ) : (
        <button
          onClick={() => setIsExpanded(true)}
          className="glass-card p-2 flex items-center gap-1"
        >
          <span className="text-sm">🗼</span>
          <ChevronRight className="w-3 h-3 text-muted-foreground" />
        </button>
      )}
    </motion.div>
  );
};

export default LandmarkLegend;
