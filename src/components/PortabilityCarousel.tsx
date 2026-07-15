import { motion, useScroll, useMotionValue, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { CAROUSEL } from '../config/site';

const THUMB_W = 150;
const THUMB_H = 215;
const GAP     = 20;
const STEP    = THUMB_W + GAP;

export const PortabilityCarousel = () => {
  const containerRef               = useRef<HTMLDivElement>(null);
  const [activeIndex, setActive]   = useState(0);
  const images                     = CAROUSEL.images;
  const N                          = images.length;
  const xMV                        = useMotionValue(0);

  // Initialize strip position so image 0 is centered in the viewport
  useEffect(() => {
    xMV.set(window.innerWidth / 2 - THUMB_W / 2);
  }, [xMV]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx    = Math.round(v * (N - 1));
    const startX = window.innerWidth / 2 - THUMB_W / 2;
    const endX   = startX - (N - 1) * STEP;
    xMV.set(startX + (endX - startX) * v);
    setActive(idx);
  });

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-ABAP-charcoal"
      style={{ height: `${N * 80}vh` }}
    >
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden">

        {/* ── Headline ─────────────────────────────────────────── */}
        <div className="pt-20 px-10 md:px-16 z-20 relative">
          <p className="font-body text-ABAP-cream/40 uppercase tracking-[0.22em] text-xs mb-3">
            {CAROUSEL.issueTag}
          </p>
          <h2 className="font-headline text-5xl md:text-7xl text-ABAP-cream uppercase leading-none">
            {CAROUSEL.headline}
            <br />
            <span style={{ WebkitTextStroke: '2px #FCFBF7', color: 'transparent' }}>
              {CAROUSEL.highlight}
            </span>
          </h2>
        </div>

        {/* ── Carousel area ────────────────────────────────────── */}
        <div className="flex-1 relative flex items-center">

          {/* Large featured image — fixed center */}
          <div className="
            absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
            z-10 w-[36vw] max-w-[480px] h-[54vh]
            rounded-2xl overflow-hidden
            shadow-[0_30px_80px_rgba(0,0,0,0.6)]
            ring-1 ring-white/10
          ">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeIndex}
                src={images[activeIndex]}
                alt={`Producto vista ${activeIndex + 1}`}
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.07 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.38, ease: 'easeOut' }}
              />
            </AnimatePresence>

            {/* Subtle inner vignette */}
            <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_40px_rgba(0,0,0,0.4)] pointer-events-none" />
          </div>

          {/* Thumbnail strip — translates horizontally with scroll */}
          <div className="absolute inset-0 flex items-center overflow-visible pointer-events-none">
            <motion.div
              className="flex items-center"
              style={{ x: xMV, gap: GAP }}
            >
              {images.map((src, i) => (
                <motion.div
                  key={i}
                  className="flex-shrink-0 overflow-hidden rounded-xl"
                  style={{ width: THUMB_W, height: THUMB_H }}
                  animate={{
                    opacity : i === activeIndex ? 0   : 0.55,
                    scale   : i === activeIndex ? 0.8 : 1,
                  }}
                  transition={{ duration: 0.38 }}
                >
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>

        {/* ── Progress dots ─────────────────────────────────────── */}
        <div className="flex justify-center gap-2 pb-4 z-20">
          {images.map((_, i) => (
            <motion.div
              key={i}
              className="rounded-full bg-ABAP-cream"
              animate={{
                width  : i === activeIndex ? 20 : 6,
                opacity: i === activeIndex ? 1  : 0.3,
              }}
              style={{ height: 6 }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>

        {/* ── Scroll indicator ──────────────────────────────────── */}
        <div className="pb-8 flex flex-col items-center gap-1.5 text-ABAP-cream/30 z-20">
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            <ChevronDown size={18} />
          </motion.div>
          <span className="font-body uppercase tracking-[0.25em] text-[10px]">
            Scroll to continue
          </span>
        </div>

      </div>
    </section>
  );
};