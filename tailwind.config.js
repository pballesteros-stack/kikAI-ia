/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Semantic tokens — todos apuntan a CSS variables.
        // Para agregar un tema nuevo: sólo editar index.css.
        'sap-bg':      'rgb(var(--sap-bg)      / <alpha-value>)',
        'sap-surface': 'rgb(var(--sap-surface)  / <alpha-value>)',
        'sap-deep':    'rgb(var(--sap-deep)      / <alpha-value>)',
        'sap-accent':  'rgb(var(--sap-accent)    / <alpha-value>)',
        'sap-accent2': 'rgb(var(--sap-accent2)   / <alpha-value>)',
        'sap-tint':    'rgb(var(--sap-tint)      / <alpha-value>)',
        'sap-ink':     'rgb(var(--sap-ink)       / <alpha-value>)',
        'sap-slate':   'rgb(var(--sap-slate)     / <alpha-value>)',
        'sap-muted':   'rgb(var(--sap-muted)     / <alpha-value>)',
        'sap-border':  'rgb(var(--sap-border)    / <alpha-value>)',
      },
      fontFamily: {
        sans:     ['Inter', 'sans-serif'],
        headline: ['Inter', 'sans-serif'],
        body:     ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
