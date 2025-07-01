/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        lato: ["Lato", "sans-serif"],
        faster: ['"Faster One"', "cursive"],
         rye: ['Rye', 'cursive'],
      },
    },
  },
  plugins: [],
};
