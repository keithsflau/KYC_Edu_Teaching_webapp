/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        calcium: '#9333ea', // Purple
        ach: '#16a34a',     // Green
        sodium: '#dc2626',  // Red
      },
    },
  },
  plugins: [],
}
