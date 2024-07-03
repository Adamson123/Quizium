/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,jsx}",
    "./src/components/*.{html,jsx}",
    "./src/pages/*.{html,jsx}",
  ],
  theme: {
    screens: {
      sm: "360px",
      md: "780px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      colors: {
        mainBg: "rgb(var(--mainBg))",
        textColor:"rgb(var(--text-color))",
        shinyPurple: "rgb(var(--shinyPurple))",
        lightGray: " rgb(var(--light-gray))",
        grayOne: "rgb(var(--gray-one))",
        grayTwo: "rgb(var(--gray-two))",
        grayThird: "rgb(var(--gray-third))",
        grayFourth:"rgb(var(--gray-fourth))",
        placeholder:"rgba(var(--placeholder))"
      },
    },
  },
  plugins: [
    require("daisyui")
  ],
};
