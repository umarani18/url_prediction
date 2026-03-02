/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                dark: "#0a0b10",
                cyan: "#00f2fe",
                blue: "#4facfe",
            },
            backgroundImage: {
                "primary-gradient": "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                "danger-gradient": "linear-gradient(135deg, #ff4b2b 0%, #ff416c 100%)",
                "success-gradient": "linear-gradient(135deg, #45EBA5 0%, #21D4FD 100%)",
            },
            fontFamily: {
                outfit: ['Outfit', 'sans-serif'],
                inter: ['Inter', 'sans-serif'],
            },
            keyframes: {
                shake: {
                    '0%, 100%': { transform: 'translateX(0)' },
                    '25%': { transform: 'translateX(-5px)' },
                    '75%': { transform: 'translateX(5px)' },
                }
            },
            animation: {
                shake: 'shake 0.4s ease-in-out',
            }
        },
    },
    plugins: [],
}
