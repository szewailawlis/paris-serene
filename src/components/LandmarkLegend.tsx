import { motion } from 'framer-motion';

interface LandmarkLegendProps {
  onLandmarkClick: (landmarkId: string) => void;
}

const landmarks = [
  { id: 'eiffel', icon: '🗼', name: 'Eiffel Tower' },
  { id: 'louvre', icon: '🏛️', name: 'Louvre' },
  { id: 'arc', icon: '🏛️', name: 'Arc de Triomphe' },
  { id: 'notre-dame', icon: '⛪', name: 'Notre Dame' },
  { id: 'sacre-coeur', icon: '⛪', name: 'Sacré-Cœur' },
];

const LandmarkLegend = ({ onLandmarkClick }: LandmarkLegendProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-20 right-4 z-[1000]"
    >
      <div className="glass-card p-3 space-y-1">
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-2 mb-2">
          Landmarks
        </h3>
        {landmarks.map((landmark) => (
          <button
            key={landmark.id}
            onClick={() => onLandmarkClick(landmark.id)}
            className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/5 transition-colors text-left"
          >
            <span className="text-lg">{landmark.icon}</span>
            <span className="text-sm text-foreground/80">{landmark.name}</span>
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default LandmarkLegend;
