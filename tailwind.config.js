/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'powder-pink': '#FDEFF4', // Çok açık pudra pembesi
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        popup: {
          '0%': { transform: 'scale(0.9)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        'spin-pop': {
          '0%': { transform: 'scale(0.3) rotate(-180deg)', opacity: 0 },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: 1 },
        },
      },
      animation: {
        float: 'float 2.5s ease-in-out infinite',
        'bounce-slow': 'bounce-slow 2.5s ease-in-out infinite',
        popup: 'popup 0.4s ease-out forwards',
        'spin-pop': 'spin-pop 0.4s ease-out forwards',
      },
    },
  },
  plugins: [],
};
