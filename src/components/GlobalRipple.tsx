import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

// Three rings per click: fast inner, medium, slow outer
const RINGS = [
  { delay: 0,    size: 120,  duration: 0.6 },
  { delay: 0.1,  size: 280,  duration: 0.9 },
  { delay: 0.2,  size: 480,  duration: 1.2 },
];

export const GlobalRipple = () => {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const id = Date.now() + Math.random();
      setRipples(prev => [...prev, { id, x: e.clientX, y: e.clientY }]);
      // Clean up after longest animation finishes
      setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 1600);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <AnimatePresence>
        {ripples.map(({ id, x, y }) => (
          <div key={id} className="absolute" style={{ left: x, top: y }}>

            {/* Center flash dot */}
            <motion.div
              className="absolute rounded-full bg-ABAP-orange"
              style={{ translateX: '-50%', translateY: '-50%' }}
              initial={{ width: 8, height: 8, opacity: 1 }}
              animate={{ width: 0,  height: 0,  opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            />

            {/* Expanding rings */}
            {RINGS.map((ring, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  border: `${1.5 - i * 0.3}px solid #0070F2`,
                  boxShadow: `0 0 ${10 - i * 2}px rgba(0,112,242,${0.5 - i * 0.12})`,
                  translateX: '-50%',
                  translateY: '-50%',
                }}
                initial={{ width: 0, height: 0, opacity: 0.9 - i * 0.1 }}
                animate={{ width: ring.size, height: ring.size, opacity: 0 }}
                transition={{ duration: ring.duration, delay: ring.delay, ease: [0.2, 0.8, 0.3, 1] }}
              />
            ))}

          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};
