/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Physiology theme
                blood: {
                    DEFAULT: '#E63946',
                    dark: '#9B2226',
                    light: '#FF6B6B',
                    bg: '#FFF0F0'
                },
                organ: {
                    pancreas: '#F4A261',
                    liver: '#8D5524', // brownish
                    muscle: '#E76F51',
                },
                molecule: {
                    glucose: '#FFFFFF', // white
                    insulin: '#457B9D', // blue
                    glucagon: '#F4A261', // orange (same as pancreas alpha) -> make distinct? User said orange. Pancreas is organ.
                    glycogen: '#FFFFFF' // chain of white
                }
            },
        },
    },
    plugins: [],
}
