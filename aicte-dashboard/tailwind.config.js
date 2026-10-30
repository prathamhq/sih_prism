/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: '#0F766E',
          'teal-dark': '#0D5B52',
          'teal-light': '#14B8A6',
          soft: '#E6F4F2',
          bg: '#F5F7FA',
          amber: '#D97706',
          red: '#DC2626',
          green: '#16A34A',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.04)',
        'card': '0 1px 3px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
}
