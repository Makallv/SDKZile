/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./resources/views/**/*.blade.php",
    "./resources/js/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#070D18',
          navy: '#0F172A',
          card: '#131D31',
          border: '#24324D',
          gold: '#E5A93C',
          goldLight: '#F5C76D',
          goldDark: '#B88225',
          accent: '#EC4899', // elegant Latin pink accent
          subtle: '#94A3B8',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gold-gradient': 'linear-gradient(135deg, #FDE68A 0%, #D97706 50%, #92400E 100%)',
        'gold-shimmer': 'linear-gradient(90deg, #F59E0B 0%, #FDE047 50%, #D97706 100%)',
      }
    },
  },
  plugins: [],
}
