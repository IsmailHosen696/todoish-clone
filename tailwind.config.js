const colors = require('tailwindcss/colors')
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      green: colors.green,
      purple: colors.purple,
      fuchsia: colors.fuchsia,
      rose: colors.rose,
      white: colors.white,
      gray: colors.trueGray,
      red: colors.red,
      blue: colors.blue,
      navWhite: "#F7F7F7",
      btnClr: "#DD4B39",
      navDark: "#282828",
      sidebarWhite: "#FAFAFA",
      sidebarDark: "#282828",
      viewboxWhite: "#FFFFFF",
      viewboxDark: "#1F1F1F",
      selectWhite: "#ECECEC",
      selectDark: "#363636",
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
