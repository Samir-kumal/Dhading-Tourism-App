/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      primary: "#B0C8B9",
      secondary: "#E9EEF2",
      white: "#ffffff",
      red: "#ff0000",
      green: "#00ff00",
      redShade: "#FFE6E0",
      cardColor: "#F3F3F3",
      statusbar: "#B4A7EB",
    },

    extend: {},
  },
  plugins: ["nativewind/babel",],
};
