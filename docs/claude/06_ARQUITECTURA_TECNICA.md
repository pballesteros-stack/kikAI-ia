# Arquitectura Técnica

## Sistema de Diseño

### Tokens de Color (`tailwind.config.js`)

| Token | Valor | Uso |
|-------|-------|-----|
| `KIKIAI-black` | #000000 | Fondo principal |
| `KIKIAI-charcoal` | #1a1a1a | Fondo secundario |
| `KIKIAI-cream` | #FCFBF7 | Texto principal |
| `KIKIAI-orange` | #FF5C00 | Acento / CTA |
| `KIKIAI-olive` | #4a5d23 | Fondo sección portabilidad |
| `KIKIAI-neon-cyan` | #00ffff | Detalles tech |
| `KIKIAI-neon-magenta` | #ff00ff | Detalles tech |

### Tipografía
- **Headlines**: Oswald (Google Fonts) — clase `font-headline`
- **Body**: Inter (Google Fonts) — clase `font-body`
- Cargadas en `index.html` vía link tag

### Clases Utilitarias (`index.css`)
- `.film-grain` — overlay de ruido cinematográfico (posición fixed, z-50)
- `.cinematic-lighting` — gradiente radial naranja sutil
- `.glass-card` — tarjeta con backdrop-blur, borde y fondo semi-transparente

## Patrones de Animación

### Scroll-Driven con sección tall
Usado en `HeroKikAI` y `PortabilityCarousel`:
```tsx
// La sección es N veces la altura del viewport
<section ref={containerRef} className="h-[400vh]">
  <div className="sticky top-0 h-screen">
    {/* Contenido animado */}
  </div>
</section>

const { scrollYProgress } = useScroll({ target: containerRef });
const value = useTransform(scrollYProgress, [0, 1], [start, end]);
```

### Viewport Animation (entrada al scroll)
Usado en secciones secundarias:
```tsx
<motion.div
  initial={{ opacity: 0, x: -50 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
/>
```

## Config Centralizada (`src/config/site.ts`)

Tres exports principales:
- `SITE` — textos de marca (nombre, modelo, tagline, copyright)
- `IMAGES` — rutas de imágenes del producto
- `PRODUCT_SPECS` — array de specs para el footer

## Vite Config
- Plugin React con Fast Refresh habilitado
- `lucide-react` excluido de optimizaciones (para tree-shaking correcto)
- Output en `dist/`
