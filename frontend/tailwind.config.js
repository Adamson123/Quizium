import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{html,jsx}",
        "./src/components/*.{html,jsx}",
        "./src/pages/*.{html,jsx}",
    ],
    theme: {
        screens: {
            sm: "640px",
            smd: "660px",
            md: "768px",
            lg: "1158px",
            slg: "1050px",
            xl: "1536px",
            sxl: "1255px",
        },
        extend: {
            colors: {
                mainBg: "rgb(var(--mainBg))",
                secMainBg: "rgb(var(--sec-mainBg))",
                textColor: "rgb(var(--text-color))",
                shinyPurple: "rgb(var(--shiny-purple))",
                blurryPurple: "rgba(var(--blurry-purple))",
                lightGray: " rgb(var(--light-gray))",
                grayOne: "rgb(var(--gray-one))",
                grayTwo: "rgb(var(--gray-two))",
                grayThird: "rgb(var(--gray-third))",
                grayFourth: "rgb(var(--gray-fourth))",
                grayFive: "rgb(var(--gray-five))",
                placeholder: "rgba(var(--placeholder))",
            },
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: ["synthwave"],
    },
};
