import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { IMAGES } from '../config/site';

// All carousel images pulled from central config — swap assets in src/config/site.ts
const CAROUSEL_IMAGES = [
  IMAGES.angle1,
  IMAGES.angle2,
  IMAGES.hero,
  IMAGES.badge,
  IMAGES.grip,
];

export const PortabilityCarousel = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Slides from left to right as the user scrolls through the section
  const xMovement = useTransform(scrollYProgress, [0, 1], ['-60vw', '10vw']);

  return (
    <section ref={containerRef} className="relative h-[300vh] w-full bg-KIKIAI-olive">
      {/* Content stays fixed in viewport while the section scrolls past */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">

        <div className="absolute inset-0 bg-KIKIAI-black/50 mix-blend-overlay z-0 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 text-center mb-16 pt-20">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-headline text-5xl md:text-8xl text-KIKIAI-cream mb-6 tracking-tight uppercase"
          >
            SO PORTABLE, <br />
            <span className="text-KIKIAI-black" style={{ WebkitTextStroke: '2px #FCFBF7' }}>IT'S WEARABLE.</span>
          </motion.h2>
        </div>

        <div className="relative w-full overflow-hidden flex items-center justify-start z-10 py-10">
          <motion.div
            className="flex gap-8 md:gap-16 items-center px-[20vw]"
            style={{ x: xMovement }}
          >
            {CAROUSEL_IMAGES.map((src, i) => (
              <div
                key={i}
                className="min-w-[70vw] md:min-w-[40vw] aspect-video rounded-[3rem] overflow-hidden shadow-2xl border-4 border-KIKIAI-charcoal/20 flex-shrink-0 group"
              >
                <img src={src} alt="Product view" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
            ))}
          </motion.div>
        </div>

        <div className="z-10 text-KIKIAI-cream font-body uppercase tracking-[0.3em] mt-10 opacity-60">
          ISSUE NO. 00124
        </div>
      </div>
    </section>
  );
};
