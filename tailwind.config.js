/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom-box': ' 0px 20px 30px -10px rgb(38, 57, 77)'
      },
      fontFamily: {
        ubuntu: ["Ubuntu", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        gradient: "url('../gradient_img.png')",
      },
    },
  },
  plugins: [],
};
