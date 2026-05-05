# Arquitectura del Proyecto

## Stack Tecnológico
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **Estilos**: Tailwind CSS 3
- **Animaciones**: Framer Motion 12
- **Backend/Auth**: Supabase (configurado, pendiente de uso)
- **Iconos**: Lucide React

## Estructura de Carpetas

```
KIKAIA/
├── public/                   # Assets estáticos (imágenes del producto)
├── src/
│   ├── components/           # Componentes React
│   │   ├── index.ts          # Barrel export — importar siempre desde aquí
│   │   ├── Navigation.tsx
│   │   ├── HeroKikAI.tsx
│   │   ├── ConceptSection.tsx
│   │   ├── PortabilityCarousel.tsx
│   │   ├── ThermalSection.tsx
│   │   ├── GripSection.tsx
│   │   └── ProductEnd.tsx
│   ├── config/
│   │   └── site.ts           # Config centralizada: nombre, imágenes, specs
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css             # Estilos globales + clases utilitarias
├── docs/
│   └── claude/               # Documentación del proyecto
├── index.html
├── tailwind.config.js
└── vite.config.ts
```

## Flujo de Datos
- Toda la config de marca vive en `src/config/site.ts`
- Los componentes leen de config — sin strings hardcodeados en JSX
- `App.tsx` importa todo desde `src/components/index.ts` (barrel export)
- Imágenes en `/public/` con nombres sin timestamps
