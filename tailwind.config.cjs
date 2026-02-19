module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'baby-pink': {
          DEFAULT: '#f8c8dc',
          50: '#fff5f9',
          100: '#ffe8f2',
          200: '#ffcce3',
          300: '#f8c8dc', // The user requested color
          400: '#f29ab8',
          500: '#e86a95',
          600: '#d14073', // Darker for text/buttons
          700: '#b02a5a',
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
