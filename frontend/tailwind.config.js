// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // adjust if your files are elsewhere
  theme: {
    extend: {
      keyframes: {
        fadeSlide: {
          "0%": { opacity: 0, transform: "translateX(4rem)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
      },
      animation: {
        fadeSlide: "fadeSlide 1s ease forwards",
      },
    },
  },
  plugins: [],
};
