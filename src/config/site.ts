// ─── Site Configuration ──────────────────────────────────────────────────────
// Edit this file to customize the project for a new brand.
// Components read from here — you should NOT need to touch JSX to rebrand.

export const SITE = {
  name:         'ABAPCLOUD',
  modelLabel:   'CLEAN CORE',
  tagline:      'OPTIMIZAR TAREAS UNIVERSALES',
  copyright:    '© 2026 ABAPCLOUD. TODOS LOS DERECHOS RESERVADOS.',
  footerCredit: 'CONSTRUIDO PARA LA NUBE.',
} as const;

// ─── Image Paths ─────────────────────────────────────────────────────────────
// All images live in /public. Update paths here when swapping assets.

export const IMAGES = {
  angle1:  '/abapcloud_angle_1.png',
  angle2:  '/abapcloud_angle_2.png',
  hero:    '/abapcloud_hero.png',
  thermal: '/abapcloud_thermal.png',
  badge:   '/abapcloud_badge.png',
  grip:    '/abapcloud_grip.png',
} as const;

// ─── Product Specs ────────────────────────────────────────────────────────────
// Displayed in the footer specs grid.

export const PRODUCT_SPECS = [
  { label: 'Plataforma',  value: 'SAP BTP' },
  { label: 'Enfoque',     value: 'Clean Core' },
  { label: 'Entorno',     value: 'S/4HANA Cloud' },
  { label: 'Soporte',     value: '24/7' },
] as const;

// ─── Hero Section ─────────────────────────────────────────────────────────────
// Three scroll-driven camera frames. Each fades in/out as the user scrolls.
// Scroll timing is controlled by constants in HeroKikAI.tsx — edit there to retune.
// frame1 = top-down flat lay | frame2 = isometric | frame3 = perspective hero shot.

export const HERO = {
  frame1: {
    line1: 'SOLUCIONES',
    line2: 'SAP MODERNAS.',
  },
  frame2: {
    line1: 'NO ES SOLO',
    line2: 'DESARROLLO.',
    subtext: 'ARQUITECTURA CLOUD. EXTENSIONES LIMPIAS.',
  },
  frame3: {
    line1: 'HECHO PARA',
    line2: 'LA NUBE.',
  },
} as const;

// ─── Concept Section ──────────────────────────────────────────────────────────
// Two-column layout: interactive hover animation (left) + text block (right).
// body[0] is rendered with a left-border accent.

export const CONCEPT = {
  headline:   'IMPULSADO POR',
  highlight:  'CLEAN CORE*',
  body: [
    'Ofrecemos servicios de desarrollo, integración y extensión de aplicaciones alineados con las mejores prácticas SAP.',
    'Nuestro enfoque garantiza desarrollos ágiles, seguros y sostenibles en entornos cloud.',
  ],
  disclaimer: '* Extensiones limpias, escalables y preparadas para el futuro.',
  hoverLabel: 'ARQUITECTURA CLOUD.',
  hoverSub:   '(Explora aquí).',
} as const;

// ─── Portability Carousel ─────────────────────────────────────────────────────
// Horizontal scroll-driven carousel. Slides left-to-right as the user scrolls.
// Add or remove entries in `images` to change carousel content.

export const CAROUSEL = {
  headline:  'TAN ESCALABLE,',
  highlight: "QUE ES GLOBAL.",
  issueTag:  'BTP EDITION 2026',
  images: [
    IMAGES.angle1,
    IMAGES.angle2,
    IMAGES.hero,
    IMAGES.badge,
    IMAGES.grip,
  ],
} as const;

// ─── Thermal Section ──────────────────────────────────────────────────────────
// Left: headline + body + interactive slider. Right: thermal image as overlay.
// sliderLabels[0] = left end (low value), sliderLabels[1] = right end (high value).

export const THERMAL = {
  headline1:     'INTEGRACIÓN',
  headline2:     'CONTINUA.',
  body:          'Conectamos tus sistemas con APIs modernas y arquitectura orientada a eventos. Robustez y velocidad en SAP BTP.',
  sliderLabels:  ['ESTABLE', 'ÁGIL'],
  sliderFormula: 'ABAP Cloud = Clean Core + BTP + S/4HANA',
} as const;

// ─── Grip Section ─────────────────────────────────────────────────────────────
// Full-bleed product image (left) + headline and copy (right).
// badge: live-metric label overlaid on the bottom-right corner of the image.

export const GRIP = {
  headline:  'EXTRA',
  highlight: 'SEGURO.',
  body:      'Desarrollos en entornos cloud certificados. Código limpio, revisado y alineado con directrices SAP. Requiere visión estratégica.',
  badge:     'SAP CERTIFIED',
} as const;

// ─── Footer Links ─────────────────────────────────────────────────────────────
// Replace href placeholders with real URLs before launch.

export const FOOTER_LINKS = {
  legal: [
    { label: 'Política de Privacidad',   href: '#' },
    { label: 'Términos de Uso',          href: '#' },
    { label: 'Configuración de Cookies', href: '#' },
    { label: 'contacto@abapcloud.cl',    href: 'mailto:contacto@abapcloud.cl' },
  ],
  socials: [
    { label: 'LinkedIn',    href: '#' },
    { label: 'GitHub',      href: '#' },
    { label: 'Twitter / X', href: '#' },
    { label: 'Instagram',   href: '#' },
  ],
} as const;
