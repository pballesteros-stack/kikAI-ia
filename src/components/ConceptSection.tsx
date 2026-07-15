import { motion } from 'framer-motion';
import { CONCEPT } from '../config/site';
import { ProductModel3D } from './ProductModel3D';

export const ConceptSection = () => {
  return (
    <section className="relative min-h-screen w-full bg-ABAP-charcoal border-y border-white/10 flex items-center overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-ABAP-neon-magenta via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-ABAP-neon-cyan via-transparent to-transparent" />

      <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-16 items-center">

        {/* Left column: 3D product model */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          className="relative h-96 w-full rounded-2xl overflow-hidden glass-card"
        >
          <ProductModel3D />
        </motion.div>

        {/* Right column: headline + body text */}
        <div className="space-y-6">
          <h2 className="font-headline text-5xl md:text-7xl uppercase text-ABAP-cream">
            {CONCEPT.headline} <br /><span className="text-ABAP-orange">{CONCEPT.highlight}</span>
          </h2>
          <div className="font-body text-ABAP-cream/60 space-y-4 text-lg">
            <p className="border-l-2 border-ABAP-orange pl-4">{CONCEPT.body[0]}</p>
            <p>{CONCEPT.body[1]}</p>
          </div>
          <div className="pt-12 text-xs uppercase tracking-[0.2em] text-ABAP-cream/30 font-body border-t border-ABAP-cream/10 mt-6">
            {CONCEPT.disclaimer}
          </div>
        </div>

      </div>
    </section>
  );
};
