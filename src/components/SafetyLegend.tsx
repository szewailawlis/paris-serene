import { motion } from 'framer-motion';

const SafetyLegend = () => {
  const levels = [
    { label: 'Safe', color: 'bg-emerald-500' },
    { label: 'Caution', color: 'bg-amber-500' },
    { label: 'Alert', color: 'bg-red-500' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="absolute bottom-4 right-3 z-[1000] safe-area-bottom"
    >
      <div className="glass-card p-2 flex items-center gap-3">
        {levels.map((level) => (
          <div key={level.label} className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-sm ${level.color} opacity-70`} />
            <span className="text-[10px] text-foreground/70">{level.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default SafetyLegend;
