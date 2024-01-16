/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
   content: ["./index.html", "./src/**/*.{tsx,ts}"],
   darkMode: "class",

   theme: {
      extend: {
         boxShadow: {
            sp: "0 0 20px #aaa",
         },
         fontFamily: {
            sans: ["STV", "Merienda", "sans-serif"],
         },
         colors: {
            dimWhite: "var(--dimWhite)",
            darkGray: "var(--darkGray)",
            dimTeal: "var(--dimTeal)",
            teal: {
               50: "var(--teal-50)",
               100: "var(--teal-100)",
               200: "var(--teal-200)",
               300: "var(--teal-300)",
               400: "var(--teal-400)",
               500: "var(--teal-500)",
               600: "var(--teal-600)",
               700: "var(--teal-700)",
               800: "var(--teal-800)",
               900: "var(--teal-900)",
            },
         },
      },
   },
   plugins: [],
});
