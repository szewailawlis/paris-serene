import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-0 left-0 right-0 z-[1000] p-3 safe-area-top"
    >
      <div className="glass-card px-3 py-2 inline-flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center glow-gold">
          <Shield className="w-4 h-4 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-sm font-semibold text-foreground tracking-tight">ParisShield</h1>
          <p className="text-[10px] text-muted-foreground">Safety Travel Guide</p>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
