/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary" : "#ff9933",
        "secondary" : "#f7a928",
        "red" : "#FF0000",
        "textColor" : "#555",
        "bgColor" : "#FCFCFC"
      },
      fontFamily: {
        "primary" : ['Roboto', 'sans-serif']
      }
    },
  },
  plugins: [require("daisyui")],
}

