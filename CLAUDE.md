# CLAUDE.md — kikAI AI Corporate Site

Plantilla de landing page premium para sitios corporativos.
Stack: React 18 + TypeScript + Vite + Tailwind CSS + Framer Motion.

---

## Documentación del Proyecto

| Archivo | Contenido |
|---------|-----------|
| [01 — Arquitectura](docs/claude/01_ARQUITECTURA.md) | Stack, estructura de carpetas, flujo de datos |
| [02 — Estado Actual](docs/claude/02_ESTADO_ACTUAL.md) | Qué está completo y qué está pendiente |
| [03 — Buenas Prácticas](docs/claude/03_BUENAS_PRACTICAS.md) | Reglas de código, imports, animaciones, CSS |
| [04 — Auditoría](docs/claude/04_AUDITORIA.md) | Resultados de revisión de calidad |
| [05 — Emergencia](docs/claude/05_EMERGENCIA.md) | Solución de problemas frecuentes |
| [06 — Arquitectura Técnica](docs/claude/06_ARQUITECTURA_TECNICA.md) | Tokens, patrones de animación, config Vite |
| [07 — Changelog](docs/claude/07_CHANGELOG.md) | Historial de cambios del proyecto |

---

## Referencia Rápida

### Comandos
```bash
npm run dev          # Servidor de desarrollo (localhost:5173)
npm run build        # Build de producción
npm run typecheck    # Verificar tipos TypeScript
npm run lint         # Verificar ESLint
```

### Para reutilizar esta plantilla en un nuevo proyecto
1. Editar `src/config/site.ts` — nombre, imágenes, specs, copyright
2. Reemplazar imágenes en `/public/`
3. Ajustar tokens de color en `tailwind.config.js` (prefijo `KIKIAI-*`)

### Archivos clave
- `src/config/site.ts` — toda la config de marca
- `src/components/index.ts` — barrel export de componentes
- `src/index.css` — tema base y clases utilitarias
- `tailwind.config.js` — tokens de color y tipografía

### Repositorio
- GitHub: https://github.com/pballesteros-stack/kikAI-ia
