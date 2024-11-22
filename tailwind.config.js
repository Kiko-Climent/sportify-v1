/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        highlight: '#cbf789',
        bg_color:'#1c1c1c',
      },
    },
  },
  plugins: [],
}

// highlight: #2a46f6 , #cbf789 
// bg_color: #e3e3e3 , #1c1c1c