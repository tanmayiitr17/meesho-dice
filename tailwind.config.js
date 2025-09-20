/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'meesho-pink': 'rgb(159, 32, 137)',
        'meesho-dark-pink': 'rgb(139, 22, 117)',
        'meesho-light-pink': 'rgb(179, 52, 157)',
        'meesho-green': 'rgb(3, 141, 99)',
        'meesho-dark-green': 'rgb(3, 121, 89)',
        'meesho-light-green': 'rgb(23, 161, 119)',
        'meesho-gray': '#666666',
        'meesho-light-gray': '#f5f5f5'
      }
    },
  },
  plugins: [],
}
