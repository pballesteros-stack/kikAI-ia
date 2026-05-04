// ─── Site Configuration ──────────────────────────────────────────────────────
// Edit this file to customize the project for a new brand.
// Components read from here — you should NOT need to touch JSX to rebrand.

export const SITE = {
  name: 'kikAI',
  modelLabel: 'KIKIAI-1 MODEL',
  tagline: 'UNNECESSARILY SOPHISTICATED',
  copyright: '© 2026 kikAI. ALL RIGHTS RESERVED.',
  footerCredit: 'DESIGNED BY SOMEONE WITH TOO MUCH TIME.',
} as const;

// ─── Image Paths ─────────────────────────────────────────────────────────────
// All images live in /public. Update paths here when swapping assets.

export const IMAGES = {
  angle1:  '/kikAI_angle_1.png',
  angle2:  '/kikAI_angle_2.png',
  hero:    '/kikAI_hero.png',
  thermal: '/kikAI_thermal.png',
  badge:   '/kikAI_badge.png',
  grip:    '/kikAI_grip.png',
} as const;

// ─── Product Specs ────────────────────────────────────────────────────────────
// Displayed in the footer specs grid.

export const PRODUCT_SPECS = [
  { label: 'Diameter',  value: '100mm' },
  { label: 'Thickness', value: '8mm' },
  { label: 'Material',  value: 'AI-Poured Silicate' },
  { label: 'Weight',    value: '142g' },
] as const;
