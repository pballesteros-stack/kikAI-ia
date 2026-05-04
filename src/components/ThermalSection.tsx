import { motion } from 'framer-motion';
import { useState } from 'react';
import { IMAGES } from '../config/site';

export const ThermalSection = () => {
  const [sliderVal, setSliderVal] = useState(50);

  return (
    <section className="relative min-h-screen w-full bg-KIKIAI-black flex items-center py-24 overflow-hidden">
      {/* Background thermal image as atmospheric overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl opacity-40 mix-blend-screen pointer-events-none">
        <img src={IMAGES.thermal} alt="Thermal rendering" className="w-full h-full object-cover rounded-3xl saturate-200" />
      </div>

      <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 text-KIKIAI-cream">
        <div className="flex flex-col justify-center">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="font-headline text-5xl md:text-8xl tracking-tight leading-none mb-6"
          >
            THERMODYNAMIC<br />STABILITY.
          </motion.h2>

          <p className="font-body text-xl text-KIKIAI-cream/60">
            Engineered using our proprietary thermal diffusion matrix. Hand-poured AI. Wait, that doesn't make sense.
          </p>

          {/* Interactive temperature-mode slider */}
          <div className="mt-12 glass-card p-8 border-KIKIAI-neon-cyan/30">
            <div className="flex justify-between font-headline text-2xl tracking-widest mb-4">
              <span className={sliderVal < 50 ? 'text-KIKIAI-neon-cyan' : 'text-KIKIAI-cream/30'}>DETERMINISTIC</span>
              <span className={sliderVal >= 50 ? 'text-KIKIAI-neon-magenta' : 'text-KIKIAI-cream/30'}>CREATIVE</span>
            </div>
            <input
              type="range"
              className="w-full appearance-none h-2 bg-KIKIAI-cream/20 rounded-full cursor-grab accent-KIKIAI-orange"
              value={sliderVal}
              onChange={(e) => setSliderVal(parseInt(e.target.value))}
            />
            <div className="mt-4 font-body text-xs text-KIKIAI-cream/30 font-mono">
              s(z)i = ez i S K j = 1 ez j
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
