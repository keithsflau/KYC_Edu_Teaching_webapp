/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'muscle-red': '#ef4444',
        'actin-blue': '#3b82f6',
        'myosin-green': '#10b981',
      }
    },
  },
  plugins: [],
}
