import { motion } from 'framer-motion';
import { IMAGES } from '../config/site';

export const GripSection = () => {
  return (
    <section className="relative min-h-screen w-full bg-KIKIAI-charcoal py-32 flex flex-col justify-center items-center">
      <div className="w-full max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
          className="relative aspect-square w-full rounded-2xl overflow-hidden glass-card p-2"
        >
          <img src={IMAGES.grip} alt="Grip setup" className="w-full h-full object-cover rounded-xl" />

          {/* Live-metrics badge overlay */}
          <div className="absolute bottom-8 right-8 glass-card px-4 py-2 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="font-body text-sm font-bold tracking-widest">112 BPM</span>
          </div>
        </motion.div>

        <div>
          <h2 className="font-headline text-6xl md:text-8xl uppercase leading-none mb-8 text-KIKIAI-cream">
            EXTRA<br />
            <span className="text-KIKIAI-orange">GRIPPY.</span>
          </h2>
          <p className="font-body text-KIKIAI-cream/70 text-2xl max-w-md">
            Built for the most intense desktop environments. It stays where you put it, period. Requires 3 cups of coffee.
          </p>
        </div>

      </div>
    </section>
  );
};
