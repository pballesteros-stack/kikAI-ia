/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'KIKIAI-black': '#000000',
        'KIKIAI-charcoal': '#1a1a1a',
        'KIKIAI-olive': '#4a5d23',
        'KIKIAI-burnt': '#cc5500',
        'KIKIAI-cream': '#FCFBF7',
        'KIKIAI-orange': '#FF5C00',
        'KIKIAI-neon-magenta': '#ff00ff',
        'KIKIAI-neon-cyan': '#00ffff',
      },
      fontFamily: {
        headline: ['Oswald', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
