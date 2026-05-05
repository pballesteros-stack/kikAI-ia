# Guía de Emergencia

## El sitio no carga en desarrollo

```bash
# 1. Verificar que el servidor esté corriendo
npm run dev

# 2. Limpiar caché de Vite
rm -rf node_modules/.vite
npm run dev

# 3. Reinstalar dependencias desde cero
rm -rf node_modules
npm install
npm run dev
```

## Error de TypeScript al compilar

```bash
npm run typecheck
# El error muestra archivo y número de línea exacto
```

## Las imágenes no aparecen

- Verificar que existan en `/public/` con el nombre exacto
- Los nombres están centralizados en `src/config/site.ts` → objeto `IMAGES`
- Nombres actuales: `kikAI_hero.png`, `kikAI_angle_1.png`, `kikAI_angle_2.png`, etc.

## Las animaciones de scroll no funcionan

- Breakpoints en `src/components/HeroKikAI.tsx` líneas 10-17
- Constantes: `F1_FADE_START = 0.25`, `F1_FADE_END = 0.35`, etc.
- Verificar que la sección tenga altura suficiente (`h-[400vh]`)

## Revertir al último commit estable

```bash
git log --oneline          # Ver historial de commits
git checkout <hash>        # Ir a un commit específico (modo detached)
git checkout main          # Volver a la rama principal
```

## Repositorio
- GitHub: https://github.com/pballesteros-stack/kikAI-ia
