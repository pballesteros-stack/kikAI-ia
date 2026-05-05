# Buenas Prácticas del Proyecto

## Regla de Oro: Un solo lugar para cambiar la marca

Toda la información de marca vive en `src/config/site.ts`.
Para adaptar esta plantilla a un nuevo proyecto:
1. Editar `src/config/site.ts` — nombre, imágenes, specs, copyright
2. Reemplazar imágenes en `/public/`
3. Ajustar colores en `tailwind.config.js` (tokens `KIKIAI-*`)
4. **No tocar JSX** para cambiar textos de marca

## Imports — usar siempre el barrel

```ts
// Correcto
import { Navigation, HeroKikAI, ConceptSection } from './components';

// Evitar
import Navigation from './components/Navigation';
```

## Animaciones Framer Motion

- Los keypoints de scroll se declaran como constantes nombradas al inicio del componente
- Formato: `F1_FADE_START`, `F2_FADE_IN`, `F3_VISIBLE`, etc.
- Nunca usar números mágicos directamente en `useTransform`

```ts
// Correcto
const F1_FADE_START = 0.25;
const op1 = useTransform(scrollYProgress, [0, F1_FADE_START], [1, 0]);

// Evitar
const op1 = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
```

## Componentes

- Cada componente tiene su propio archivo
- Dos secciones independientes = dos archivos separados
- Props opcionales con defaults sensatos
- Interfaces TypeScript para todas las props

## CSS / Tailwind

- Usar tokens (`KIKIAI-black`, `KIKIAI-orange`) — no hex directos en className
- Clases reutilizables en `@layer components` de `index.css`
- El tema base (background, color, fuente) vive en `index.css` — no en `App.tsx`

## Git

- Correr `npm run typecheck && npm run lint` antes de cada commit
- Un PR por feature o fix
- Commits descriptivos en inglés
