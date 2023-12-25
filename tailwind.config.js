/** @type {import('tailwindcss').Config} */
    export default {
        content: [ "./index.html",
            "./src/**/*.{js,ts,jsx,tsx}",
        ],
        safelist: [
            'rotate-180',
            'rotate-0',
            'opacity-100',
            'opacity-0',
            'pointer-events-auto',
            'pointer-events-none',
            'scale-100',
            'scale-75',
            'z-10',
            'z-0'
        ],
        theme: {
            extend: {},
        },
        plugins: [],
    }

