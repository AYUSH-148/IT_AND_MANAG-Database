/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{html,js}"];
export const theme = {
  extend: {
    colors:{
        'skin': {
          'light': '#f5f5cf',   // Light skin tone
        },
    }
  },
};
export const plugins = [
    require('tailwind-scrollbar'),
];