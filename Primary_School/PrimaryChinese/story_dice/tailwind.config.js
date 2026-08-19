/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'chinese': ['Microsoft YaHei', 'PingFang TC', 'Heiti TC', 'Arial', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 1s linear',
        'flip': 'flip 0.6s ease-in-out',
        'bounce-slow': 'bounce 1s infinite',
      },
      keyframes: {
        flip: {
          '0%': { transform: 'rotateY(0deg)' },
          '50%': { transform: 'rotateY(90deg)' },
          '100%': { transform: 'rotateY(0deg)' },
        }
      }
    },
  },
  plugins: [],
}
