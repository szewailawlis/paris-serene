import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import { Arrondissement } from '@/data/parisData';

interface SafetyCardProps {
  arrondissement: Arrondissement | null;
  onClose: () => void;
}

const SafetyCard = ({ arrondissement, onClose }: SafetyCardProps) => {
  if (!arrondissement) return null;

  const getIcon = () => {
    switch (arrondissement.safetyLevel) {
      case 'safe': return <CheckCircle className="w-6 h-6 text-emerald-400" />;
      case 'caution': return <AlertTriangle className="w-6 h-6 text-amber-400" />;
      case 'danger': return <Shield className="w-6 h-6 text-red-400" />;
    }
  };

  const getBadgeClass = () => {
    switch (arrondissement.safetyLevel) {
      case 'safe': return 'safety-badge-safe';
      case 'caution': return 'safety-badge-caution';
      case 'danger': return 'safety-badge-danger';
    }
  };

  const getScoreColor = () => {
    if (arrondissement.safetyScore >= 8) return 'text-emerald-400';
    if (arrondissement.safetyScore >= 6) return 'text-amber-400';
    return 'text-red-400';
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-4 left-4 z-[1000] w-80"
      >
        <div className="glass-card p-5">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              {getIcon()}
              <div>
                <h3 className="font-semibold text-foreground">{arrondissement.name}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full ${getBadgeClass()}`}>
                  {arrondissement.safetyLevel.charAt(0).toUpperCase() + arrondissement.safetyLevel.slice(1)}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          <div className="mb-4">
            <div className="flex items-baseline gap-2">
              <span className={`text-4xl font-bold ${getScoreColor()}`}>
                {arrondissement.safetyScore}
              </span>
              <span className="text-muted-foreground text-sm">/10</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Safety Score</p>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Local Tips</h4>
            <ul className="space-y-2">
              {arrondissement.tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-foreground/80">
                  <span className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SafetyCard;
