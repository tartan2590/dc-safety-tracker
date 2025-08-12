/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef6ff', 100: '#d9eaff', 200: '#bcd9ff', 300: '#8ec1ff',
          400: '#589fff', 500: '#2f7dff', 600: '#1f63e5', 700: '#1b52bb',
          800: '#1b4694', 900: '#1b3a75'
        }
      },
      boxShadow: {
        soft: '0 6px 24px rgba(0,0,0,0.06)'
      },
      borderRadius: {
        '2xl': '1rem'
      }
    },
  },
  plugins: [],
}
