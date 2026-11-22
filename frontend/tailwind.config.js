export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        soft: '0 12px 30px rgba(20, 83, 45, 0.08)',
      },
      colors: {
        brand: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#16a34a',
          600: '#14532d',
          700: '#0b2e1f',
        },
      },
    },
  },
  plugins: [],
}
