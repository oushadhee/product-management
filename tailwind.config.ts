import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './pages/**/*.{js,ts,jsx,tsx,mdx}', // in case you add pages later
    ],
    theme: {
        extend: {
            // You can add custom colors, fonts, etc. here later if needed
        },
    },
    plugins: [],
    darkMode: 'class',   // Important for dark mode support
};

export default config;