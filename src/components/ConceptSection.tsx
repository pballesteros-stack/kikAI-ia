import { motion } from 'framer-motion';
import { SITE } from '../config/site';

export const ConceptSection = () => {
  return (
    <section className="relative min-h-screen w-full bg-KIKIAI-charcoal border-y border-white/10 flex items-center overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-KIKIAI-neon-magenta via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-KIKIAI-neon-cyan via-transparent to-transparent" />

      <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          className="relative group cursor-crosshair h-96 w-full glass-card flex items-center justify-center p-8 overflow-hidden"
        >
          {/* Interactive hand-hover simulator */}
          <div className="text-4xl font-headline text-KIKIAI-cream/30 group-hover:-translate-y-4 group-hover:scale-110 group-hover:text-KIKIAI-orange transition-all duration-[600ms] ease-out text-center relative z-20">
            HAND HOVER DETECTOR.
            <div className="text-sm font-body mt-4 font-normal text-KIKIAI-cream/50">(Try hovering here).</div>
          </div>

          {/* Rotating abstract AI core */}
          <motion.div
            className="absolute p-40 rounded-full border-[10px] border-KIKIAI-neon-magenta/10 group-hover:scale-150 transition-all duration-700"
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute p-20 border-[2px] border-KIKIAI-neon-cyan/40 border-dashed rounded-full group-hover:rotate-180 group-hover:bg-KIKIAI-neon-cyan/10 transition-all duration-[2s] ease-in-out"
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>

        <div className="space-y-6">
          <h2 className="font-headline text-5xl md:text-7xl uppercase text-KIKIAI-cream">
            POWERED BY <br /><span className="text-KIKIAI-orange">AI*</span>
          </h2>
          <div className="font-body text-KIKIAI-cream/60 space-y-4 text-lg">
            <p className="border-l-2 border-KIKIAI-orange pl-4">
              The {SITE.modelLabel} leverages deep situational awareness to realize that yes, you are about to put a cup down.
            </p>
            <p>Our proprietary neural engine processes over zero calculations per second to ensure ultimate thermodynamic compliance.</p>
          </div>
          <div className="pt-12 text-xs uppercase tracking-[0.2em] text-KIKIAI-cream/30 font-body border-t border-KIKIAI-cream/10 mt-6">
            * Actually, just pure geometry and an overactive imagination.
          </div>
        </div>
      </div>
    </section>
  );
};
