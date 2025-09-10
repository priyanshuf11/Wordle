/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blackbg: '#121213', // Custom background color
        borderColor: '#474747', // Custom border color
        key_bg: '#7d8b99', // Custom key background color
        correct: '#3d7f30', // correct green
        incorrect:'#565b65',// incorrect black
        misplaced:'#b19f00',// misplaced yellow
      },
    },
  },
  plugins: [],
}
