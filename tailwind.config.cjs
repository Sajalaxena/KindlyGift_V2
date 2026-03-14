module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'baby-pink': {
          DEFAULT: '#ECD2D0',
          50: '#FDF7F7',
          100: '#FAF1F1',
          200: '#F4E3E2',
          300: '#ECD2D0', // The user requested color
          400: '#E1BCBA',
          500: '#CE928C',
          600: '#B77570', // Darker for text/buttons
          700: '#945854',
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
