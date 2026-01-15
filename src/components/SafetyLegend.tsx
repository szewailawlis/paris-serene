import { motion } from 'framer-motion';

const SafetyLegend = () => {
  const levels = [
    { label: 'Safe', color: 'bg-emerald-500', score: '8-10' },
    { label: 'Caution', color: 'bg-amber-500', score: '6-7.9' },
    { label: 'High Alert', color: 'bg-red-500', score: '0-5.9' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="absolute bottom-6 right-4 z-[1000]"
    >
      <div className="glass-card p-3">
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
          Safety Zones
        </h3>
        <div className="space-y-1.5">
          {levels.map((level) => (
            <div key={level.label} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-sm ${level.color} opacity-60`} />
              <span className="text-xs text-foreground/80">{level.label}</span>
              <span className="text-xs text-muted-foreground ml-auto">{level.score}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SafetyLegend;
