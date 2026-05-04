import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { IMAGES, SITE } from '../config/site';

// Scroll progress breakpoints for the 3-frame camera sequence (0 = section top, 1 = section bottom).
// The hero animates: top-down -> isometric -> perspective.
// Adjust these to retune timing without touching JSX.

const F1_FADE_START = 0.25; // Frame 1 begins fading out
const F1_FADE_END   = 0.35; // Frame 1 fully gone
const F2_FADE_IN    = 0.25; // Frame 2 starts appearing
const F2_PEAK_END   = 0.60; // Frame 2 starts fading out
const F2_FADE_OUT   = 0.70; // Frame 2 fully gone
const F3_FADE_IN    = 0.60; // Frame 3 starts appearing
const F3_VISIBLE    = 0.70; // Frame 3 fully visible

const HeroKikAI = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Section is 400vh tall so scroll-driven animations have plenty of room
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Frame opacity
  const op1 = useTransform(scrollYProgress, [0, F1_FADE_START, F1_FADE_END], [1, 1, 0]);
  const op2 = useTransform(scrollYProgress, [F2_FADE_IN, F1_FADE_END, F2_PEAK_END, F2_FADE_OUT], [0, 1, 1, 0]);
  const op3 = useTransform(scrollYProgress, [F3_FADE_IN, F3_VISIBLE, 1], [0, 1, 1]);

  // Frame scale
  const scale1 = useTransform(scrollYProgress, [0, F1_FADE_END], [1, 1.5]);
  const scale2 = useTransform(scrollYProgress, [F2_FADE_IN, F2_FADE_OUT], [0.8, 1.1]);
  const scale3 = useTransform(scrollYProgress, [F3_FADE_IN, 1], [1.2, 1]);

  // Frame vertical movement
  const yMove2 = useTransform(scrollYProgress, [F2_FADE_IN, F2_FADE_OUT], ['10vh', '0vh']);
  const yMove3 = useTransform(scrollYProgress, [F3_FADE_IN, 1], ['20vh', '-10vh']);

  // Text sequence
  const text1Op = useTransform(scrollYProgress, [0, 0.15, F1_FADE_START], [1, 1, 0]);
  const text1Y  = useTransform(scrollYProgress, [0, F1_FADE_START], ['0%', '-50%']);
  const text2Op = useTransform(scrollYProgress, [0.2, F1_FADE_END, 0.5, F2_PEAK_END], [0, 1, 1, 0]);
  const text2Y  = useTransform(scrollYProgress, [0.2, F2_PEAK_END], ['50%', '-50%']);
  const text3Op = useTransform(scrollYProgress, [0.55, F3_VISIBLE, 1], [0, 1, 1]);
  const text3Y  = useTransform(scrollYProgress, [0.55, 0.8], ['50%', '0%']);

  return (
    <section ref={containerRef} className="relative h-[400vh] w-full bg-KIKIAI-black">
      {/* Content stays fixed in viewport while the section scrolls past */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center">

        <div className="absolute inset-0 cinematic-lighting z-0" />

        {/* FRAME 1 - Top-down flat lay */}
        <motion.div style={{ opacity: op1, scale: scale1 }} className="absolute inset-0 w-full h-full z-10 flex items-center justify-center pointer-events-none">
          <img src={IMAGES.angle1} alt={SITE.name + ' top down'} className="w-[100vw] h-[100vh] object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80" />
        </motion.div>

        {/* FRAME 2 - Isometric 45-degree angle */}
        <motion.div style={{ opacity: op2, scale: scale2, y: yMove2 }} className="absolute inset-0 w-full h-full z-10 flex items-center justify-center pointer-events-none">
          <img src={IMAGES.angle2} alt={SITE.name + ' isometric'} className="w-[100vw] h-[100vh] object-cover opacity-80" />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>

        {/* FRAME 3 - Perspective hero shot (final resting frame) */}
        <motion.div style={{ opacity: op3, scale: scale3, y: yMove3 }} className="absolute bottom-0 md:-bottom-10 w-full md:w-[90vw] max-w-7xl z-20 pointer-events-none self-end flex items-end justify-center">
          <img src={IMAGES.hero} alt={SITE.name + ' perspective'} className="w-full aspect-video object-cover rounded-t-[3rem] border-t-2 border-x border-white/10 shadow-[0_0_100px_rgba(255,92,0,0.15)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </motion.div>

        {/* Text sequence — three headlines timed to each frame transition */}
        <div className="relative z-30 w-full h-full flex flex-col items-center justify-center px-4 pointer-events-none text-center">

          <motion.div style={{ opacity: text1Op, y: text1Y }} className="absolute">
            <h1 className="font-headline text-5xl md:text-8xl lg:text-[9rem] font-bold text-KIKIAI-cream tracking-tight uppercase leading-[0.85]">
              PERFECT <br />
              <span className="text-transparent" style={{ WebkitTextStroke: '2px #FCFBF7' }}>GEOMETRY.</span>
            </h1>
          </motion.div>

          <motion.div style={{ opacity: text2Op, y: text2Y }} className="absolute">
            <h2 className="font-headline text-4xl md:text-7xl lg:text-9xl text-KIKIAI-cream shadow-2xl">
              ISN'T JUST <br />A COASTER.
            </h2>
            <p className="font-body text-xl text-KIKIAI-cream/80 mt-6 tracking-widest font-light">OBSESSIVE ATTENTION TO DETAIL.</p>
          </motion.div>

          <motion.div style={{ opacity: text3Op, y: text3Y, top: '20%' }} className="absolute flex flex-col items-center">
            <h1 className="font-headline text-5xl md:text-7xl font-bold text-KIKIAI-orange tracking-tight uppercase leading-none drop-shadow-2xl">
              MADE FOR MUGS.<br />
              <span className="text-KIKIAI-cream">BUILT FOR TABLES.</span>
            </h1>
            <div className="mt-8 px-6 py-2 border border-KIKIAI-cream/20 rounded-full font-body text-sm tracking-[0.2em] uppercase backdrop-blur-md">
              {SITE.tagline}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroKikAI;
