import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-0 left-0 right-0 z-[1000] p-4"
    >
      <div className="glass-card px-5 py-3 inline-flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center glow-gold">
          <Shield className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-foreground tracking-tight">ParisShield</h1>
          <p className="text-xs text-muted-foreground">Luxury Safety Travel Guide</p>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
