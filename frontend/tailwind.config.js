/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        traffic: {
          green: '#22c55e',
          yellow: '#facc15',
          red: '#ef4444'
        }
      }
    }
  },
  plugins: []
};
