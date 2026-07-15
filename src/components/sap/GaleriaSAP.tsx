import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Mountain, ShoppingCart, Zap, Users, Factory, Landmark } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { T } from '../../i18n/translations';

const CARD_META = [
  { icon: Mountain,     color: '#1E3A8A' },
  { icon: ShoppingCart, color: '#0E7490' },
  { icon: Zap,          color: '#78350F' },
  { icon: Users,        color: '#4C1D95' },
  { icon: Factory,      color: '#065F46' },
  { icon: Landmark,     color: '#881337' },
];

const THUMB_SCALE = 0.35;

export default function GaleriaSAP() {
  const { lang } = useLanguage();
  const t        = T[lang].galeria;
  const cards    = t.cards;
  const N        = cards.length;

  const [active, setActive] = useState(0);
  const [mainH,  setMainH]  = useState(0);
  const [mainW,  setMainW]  = useState(0);
  const containerRef         = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const compute = () => {
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      let h = vh * 0.468;
      let w = h * (85 / 110);
      const maxW = vw * (vw < 1024 ? 0.8 : 0.86);
      if (w > maxW) {
        w = maxW;
        h = w * (110 / 85);
      }
      setMainH(h);
      setMainW(w);
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(Math.min(N - 1, Math.floor(v * N)));
  });

  const goTo = useCallback((i: number) => {
    const el = containerRef.current;
    if (!el) return;
    const top      = el.getBoundingClientRect().top + window.scrollY;
    const range    = el.clientHeight - window.innerHeight;
    const progress = (i + 0.5) / N;
    window.scrollTo({ top: top + progress * range, behavior: 'smooth' });
  }, [N]);

  const thumbW   = mainW * THUMB_SCALE;
  const thumbGap = thumbW * 0.14;

  const getX = (diff: number) => {
    if (diff === 0) return 0;
    const sign  = Math.sign(diff);
    const abs   = Math.abs(diff);
    const first = mainW * (1 + THUMB_SCALE) / 2 + thumbGap;
    const step  = thumbW + thumbGap;
    return sign * (first + (abs - 1) * step);
  };

  return (
    <div ref={containerRef} id="industrias" style={{ height: `${N * 60}vh` }}>
      <section
        className="relative w-full overflow-hidden bg-sap-bg"
        style={{ position: 'sticky', top: 0, height: '100vh' }}
      >
      <div className="container-sap relative h-full">
        {/* Cards */}
        <div className="absolute inset-0 flex items-center justify-center">
          {cards.map((c, i) => {
            const diff = i - active;
            const abs  = Math.abs(diff);
            if (abs > 2) return null;
            const { icon: CI, color } = CARD_META[i];

            const x          = mainH > 0 ? getX(diff) : 0;
            const scale      = abs === 0 ? 1 : THUMB_SCALE;
            const opacity    = abs === 0 ? 1 : abs === 1 ? 0.55 : abs === 2 ? 0.3 : 0.1;
            const brightness = abs === 0 ? 1 : 0.5;

            return (
              <motion.div
                key={i}
                className="absolute rounded-2xl overflow-hidden"
                style={{
                  width:      mainW,
                  height:     mainH,
                  zIndex:     10 - abs,
                  cursor:     abs === 0 ? 'default' : 'pointer',
                  background: `linear-gradient(150deg, ${color}f2 0%, ${color}70 100%)`,
                }}
                animate={{ x, scale, opacity, filter: `brightness(${brightness})` }}
                transition={{ type: 'spring', stiffness: 260, damping: 30 }}
                onClick={() => { if (abs !== 0) goTo(i); }}
              >
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse 80% 45% at 50% 0%, rgba(255,255,255,0.2), transparent)' }}
                />
                {abs === 0 && (
                  <div className="absolute inset-[6px] rounded-xl border border-dashed border-white/20 pointer-events-none" />
                )}

                {/* Ícono grande de fondo */}
                <CI
                  className="absolute -bottom-10 -right-10 text-white/[0.14] pointer-events-none"
                  style={{ width: mainW * 0.65, height: mainW * 0.65 }}
                  strokeWidth={1}
                  aria-hidden
                />

                <div className="relative z-10 flex flex-col h-full p-8 justify-between select-none">
                  <span className="inline-flex self-start text-[10px] font-bold uppercase tracking-widest text-white/50 bg-white/10 border border-white/15 rounded-full px-3 py-1">
                    {c.tag}
                  </span>

                  <div>
                    <span className="block text-5xl font-bold text-white tracking-tight">
                      {c.statValue}
                    </span>
                    <span className="block text-xs text-white/60 font-medium mt-1 max-w-[140px] leading-snug">
                      {c.statLabel}
                    </span>
                  </div>

                  <div>
                    <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center mb-5">
                      <CI size={22} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white leading-snug tracking-tight mb-2">
                      {c.title}
                    </h3>
                    <p className="text-sm text-white/70 leading-relaxed mb-4 line-clamp-3">
                      {c.desc}
                    </p>
                    <span className="text-[10px] font-bold text-white/20 tabular-nums">
                      {String(i + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Scroll to continue */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
          animate={{ opacity: active === N - 1 ? 0 : 1 }}
        >
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            className="w-6 h-6 rounded-full border border-sap-border flex items-center justify-center text-sap-muted"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1.5 3.5L5 7L8.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-sap-muted">
            Scroll para continuar
          </span>
        </motion.div>
      </div>
      </section>
    </div>
  );
}