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
            fontFamily:{
                'suitR':['SUIT-Regular']
              },
        },
    },
    plugins: [require('daisyui')],
};
