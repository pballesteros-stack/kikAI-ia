import { motion } from 'framer-motion';
import { GRIP } from '../config/site';
import { GripParallax } from './GripParallax';

export const GripSection = () => {
  return (
    <section className="relative min-h-screen w-full bg-ABAP-charcoal py-32 flex flex-col justify-center items-center">
      <div className="w-full max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* Left column: 3D parallax image with floating badge layer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
          className="relative aspect-square w-full rounded-2xl overflow-hidden glass-card"
        >
          <GripParallax />

          {/* Live-metrics badge overlay (HTML layer, on top of canvas) */}
          <div className="absolute bottom-8 right-8 glass-card px-4 py-2 flex items-center gap-3 pointer-events-none">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="font-body text-sm font-bold tracking-widest">{GRIP.badge}</span>
          </div>
        </motion.div>

        {/* Right column: headline and body copy */}
        <div>
          <h2 className="font-headline text-6xl md:text-8xl uppercase leading-none mb-8 text-ABAP-cream">
            {GRIP.headline}<br />
            <span className="text-ABAP-orange">{GRIP.highlight}</span>
          </h2>
          <p className="font-body text-ABAP-cream/70 text-2xl max-w-md">
            {GRIP.body}
          </p>
        </div>

      </div>
    </section>
  );
};
