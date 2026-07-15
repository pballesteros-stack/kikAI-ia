import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const THEMES = [
  { id: 'corporate',  label: 'Corporate',  a: '#1E3A8A', b: '#3B82F6' },
  { id: 'lavanda',    label: 'Cian',       a: '#0E7490', b: '#22D3EE' },
  { id: 'menta',      label: 'Menta',      a: '#065F46', b: '#10B981' },
  { id: 'melocoton',  label: 'Melocotón',  a: '#92400E', b: '#F59E0B' },
  { id: 'amarillo',   label: 'Dorado',     a: '#92711A', b: '#E8B04B' },
] as const;

type ThemeId = typeof THEMES[number]['id'];

function applyTheme(id: ThemeId) {
  const html = document.documentElement;
  html.classList.add('transitioning');
  THEMES.forEach(t => html.classList.remove(`theme-${t.id}`));
  if (id !== 'corporate') html.classList.add(`theme-${id}`);
  localStorage.setItem('sap-theme', id);
  setTimeout(() => html.classList.remove('transitioning'), 460);
}

export default function ThemeToggle() {
  const [open,   setOpen]   = useState(false);
  const [active, setActive] = useState<ThemeId>('corporate');

  useEffect(() => {
    const saved = localStorage.getItem('sap-theme') as ThemeId | null;
    if (saved && THEMES.some(t => t.id === saved)) {
      setActive(saved);
      applyTheme(saved);
    }
  }, []);

  const select = (id: ThemeId) => {
    setActive(id);
    applyTheme(id);
    setOpen(false);
  };

  const current = THEMES.find(t => t.id === active)!;

  return (
    <div className="fixed bottom-6 left-6 z-[200] flex flex-col items-start gap-3">

      {/* Panel de paletas */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0,  scale: 1     }}
            exit={{    opacity: 0, y: 10, scale: 0.95  }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white border border-slate-100 rounded-2xl shadow-2xl shadow-slate-900/10 p-2 min-w-[180px]"
          >
            {THEMES.map(theme => (
              <button
                key={theme.id}
                onClick={() => select(theme.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-150 ${
                  active === theme.id
                    ? 'bg-slate-100 text-slate-900'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {/* Swatch doble */}
                <span className="flex gap-0.5 shrink-0">
                  <span className="w-4 h-4 rounded-full shadow-sm" style={{ background: theme.a }} />
                  <span className="w-4 h-4 rounded-full shadow-sm" style={{ background: theme.b }} />
                </span>
                <span className="flex-1 text-left">{theme.label}</span>
                {active === theme.id && (
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón flotante */}
      <motion.button
        onClick={() => setOpen(v => !v)}
        whileHover={{ scale: 1.04 }}
        whileTap={{   scale: 0.96 }}
        className="flex items-center gap-2.5 bg-white border border-slate-200 rounded-full pl-3 pr-4 py-2.5 shadow-lg hover:shadow-xl transition-shadow duration-200 select-none"
        aria-label="Cambiar paleta de colores"
      >
        {/* Dots del tema activo */}
        <span className="flex gap-0.5">
          <span className="w-3 h-3 rounded-full shadow-sm" style={{ background: current.a }} />
          <span className="w-3 h-3 rounded-full shadow-sm" style={{ background: current.b }} />
        </span>
        <span className="text-xs font-semibold text-slate-600">{current.label}</span>
        {/* Chevron animado */}
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          width="10" height="10" viewBox="0 0 10 10" fill="none"
          className="text-slate-400"
        >
          <path d="M1.5 3.5L5 7L8.5 3.5" stroke="currentColor" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </motion.button>

    </div>
  );
}
