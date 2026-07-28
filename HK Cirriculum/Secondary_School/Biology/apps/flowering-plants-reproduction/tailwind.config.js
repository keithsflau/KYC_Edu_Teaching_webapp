/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'plant-green': '#4ade80',
        'pollen-yellow': '#facc15',
        'floral-pink': '#f472b6',
        'bg-nature': '#f0fdf4',
      },
    },
  },
  plugins: [],
}
