/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                hydrophilic: '#60a5fa', // blue-400
                hydrophobic: '#fac048', // yellow
            }
        },
    },
    plugins: [],
}
