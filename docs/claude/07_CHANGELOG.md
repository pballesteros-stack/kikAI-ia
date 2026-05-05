# Changelog

## [1.0.0] — Mayo 2026

### Agregado
- Landing page con hero cinematográfico scroll-driven (3 frames)
- Sección concepto con animación interactiva hover
- Carrusel horizontal scroll-driven (PortabilityCarousel)
- Sección thermal con slider de temperatura interactivo
- Sección grip con overlay de métricas live
- Footer con grid de specs, links y copyright
- Config centralizada en `src/config/site.ts` (SITE, IMAGES, PRODUCT_SPECS)
- Barrel export en `src/components/index.ts`
- Repositorio en GitHub: `pballesteros-stack/kikAI-ia`
- Documentación Claude en `docs/claude/`

### Cambiado
- Proyecto renombrado de Oryzo AI → kikAI AI
- Imágenes renombradas sin timestamps (`kikAI_hero.png`, etc.)
- `HeroOryzo.tsx` → `HeroKikAI.tsx`
- `AIParodySection` → `ConceptSection`
- `ThermalGripSections.tsx` separado en `ThermalSection.tsx` + `GripSection.tsx`
- `App.tsx` usa barrel imports y sin tema duplicado
- `index.css` usa token `@apply bg-KIKIAI-black` en lugar de hex hardcodeado
- ESLint actualizado a `typescript-eslint 8.59.2`

### Eliminado
- 7 componentes fantasma: `Header`, `Hero`, `Features`, `Pricing`, `Testimonials`, `CTA`, `Footer`
- Referencias a Bolt.new en meta tags de `index.html`
- Números mágicos en animaciones (reemplazados por constantes nombradas)
