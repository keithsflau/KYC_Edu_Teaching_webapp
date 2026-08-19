/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                enzyme: {
                    DEFAULT: '#3B82F6', // Blue-500
                    active: '#2563EB',
                    denatured: '#94A3B8', // Slate-400
                },
                substrate: '#EAB308', // Yellow-500
                product: '#22C55E', // Green-500
                inhibitor: {
                    competitive: '#EF4444', // Red-500
                    noncompetitive: '#A855F7', // Purple-500
                }
            }
        },
    },
    plugins: [],
}
