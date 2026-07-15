import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { THERMAL } from '../config/site';
import { ThermalShader } from './ThermalShader';

export const ThermalSection = () => {
  const [sliderVal, setSliderVal] = useState(50);
  // Ref keeps shader in sync without triggering re-renders on every slider tick
  const tempRef = useRef(0.5);

  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseInt(e.target.value);
    setSliderVal(v);
    tempRef.current = v / 100;
  };

  return (
    <section className="relative min-h-screen w-full bg-ABAP-black flex items-center py-24 overflow-hidden">

      {/* Live thermal shader — replaces static image */}
      <div className="absolute inset-0 opacity-50 mix-blend-screen pointer-events-none">
        <ThermalShader tempRef={tempRef} />
      </div>

      <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 text-ABAP-cream">
        <div className="flex flex-col justify-center">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="font-headline text-5xl md:text-8xl tracking-tight leading-none mb-6"
          >
            {THERMAL.headline1}<br />{THERMAL.headline2}
          </motion.h2>

          <p className="font-body text-xl text-ABAP-cream/60">{THERMAL.body}</p>

          {/* Interactive temperature-mode slider — drives the shader */}
          <div className="mt-12 glass-card p-8 border-ABAP-neon-cyan/30">
            <div className="flex justify-between font-headline text-2xl tracking-widest mb-4">
              <span className={sliderVal < 50 ? 'text-ABAP-neon-cyan' : 'text-ABAP-cream/30'}>{THERMAL.sliderLabels[0]}</span>
              <span className={sliderVal >= 50 ? 'text-ABAP-neon-magenta' : 'text-ABAP-cream/30'}>{THERMAL.sliderLabels[1]}</span>
            </div>
            <input
              type="range"
              className="w-full appearance-none h-2 bg-ABAP-cream/20 rounded-full cursor-grab accent-ABAP-orange"
              value={sliderVal}
              onChange={handleSlider}
            />
            <div className="mt-4 font-body text-xs text-ABAP-cream/30 font-mono">
              {THERMAL.sliderFormula}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
