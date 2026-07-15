import { motion } from 'framer-motion';
import { useState } from 'react';
import { SITE } from '../config/site';

interface NavigationProps {
  links?: string[];
}

const Navigation = ({ links = ['INTRO', 'FEATURES', 'PRODUCT', 'CONTACT'] }: NavigationProps) => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-12 py-6 mix-blend-difference text-ABAP-cream"
    >
      <div className="font-headline text-3xl font-bold tracking-tighter uppercase leading-none">
        {SITE.name}
      </div>

      <div className="hidden md:flex items-center gap-8 font-body text-sm tracking-[0.2em] font-medium">
        {links.map((link) => (
          <div
            key={link}
            className="relative cursor-pointer overflow-hidden group"
            onMouseEnter={() => setHoveredLink(link)}
            onMouseLeave={() => setHoveredLink(null)}
          >
            {/* Default label slides up on hover */}
            <motion.div
              animate={hoveredLink === link ? { y: '-100%' } : { y: '0%' }}
              transition={{ duration: 0.3, ease: 'circOut' }}
            >
              <div className="py-1">{link}</div>
            </motion.div>

            {/* Accent label slides in from below */}
            <motion.div
              className="absolute top-0 py-1 text-ABAP-orange"
              initial={{ y: '100%' }}
              animate={hoveredLink === link ? { y: '0%' } : { y: '100%' }}
              transition={{ duration: 0.3, ease: 'circOut' }}
            >
              {link}
            </motion.div>
          </div>
        ))}
      </div>

      <div className="font-body text-xs tracking-widest px-3 py-1 border border-ABAP-cream/30 rounded-full flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-ABAP-neon-cyan animate-pulse" />
        {SITE.modelLabel}
      </div>
    </motion.nav>
  );
};

export default Navigation;
