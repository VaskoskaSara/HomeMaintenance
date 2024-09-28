/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkgoldenrod: '#b8860b', // Add this line
      },
      height: {
        '45': '45px',
    },
    },
  },
  plugins: [],
}

