/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
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
