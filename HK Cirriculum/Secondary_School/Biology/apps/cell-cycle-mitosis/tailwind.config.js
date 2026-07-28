/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'dna-paternal': '#3b82f6', // blue-500
                'dna-maternal': '#ef4444', // red-500
            }
        },
    },
    plugins: [],
}
