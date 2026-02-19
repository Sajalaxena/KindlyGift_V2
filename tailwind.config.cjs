module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'baby-pink': {
          DEFAULT: '#ffc8dd',
          50: '#fff5fa',
          100: '#ffe8f5',
          200: '#ffd1e8',
          300: '#ffc8dd', // The user requested color
          400: '#ff9ec5',
          500: '#ff7eb0',
          600: '#d65a8d', // Darker for text/buttons
          700: '#b03a6b',
        }
      },
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
