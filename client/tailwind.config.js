//tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx}'], // js, jsx만 사용
    theme: {
        extend: {
            colors: {
                chatColor: '#4d70e3',
                signatureColor: '#2C86ED',
            },
            screens: {
                '3xl': '1700px', 
            },
        },
    },
    plugins: [require('@tailwindcss/line-clamp')],
};
