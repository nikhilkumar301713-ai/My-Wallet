// /** @type {import('tailwindcss').Config} */
// export default {
//   darkMode: "class",
//   content: ["./index.html", "./src/**/*.{js,jsx}"],
//   theme: {
//     extend: {
//       colors: {
//         primary: {
//           50: "#eef2ff",
//           100: "#e0e7ff",
//           500: "#6366f1",
//           600: "#4f46e5",
//           700: "#4338ca",
//         },
//       },
//     },
//   },
//   plugins: [],
// };


/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        // Warm cream/stone scale — used everywhere via "gray-*" classes
        // (bg-gray-50, text-gray-400, border-gray-200, dark:bg-gray-900, etc.)
        // Overriding this one scale re-themes the whole app without touching
        // every component file.
        gray: {
          50: "#FBF7EF",
          100: "#F5EBDA",
          200: "#E9D8BC",
          300: "#D8BF97",
          400: "#B79A6E",
          500: "#8F7350",
          600: "#6E5A40",
          700: "#4E4130",
          800: "#332A1F",
          900: "#221A12",
          950: "#15100B",
        },
        // Coffee/brown accent — used via "primary-*" classes for buttons,
        // links, active states, icons, etc.
        primary: {
          50: "#FBF2E8",
          100: "#F3DFC3",
          200: "#E5C093",
          300: "#D19D60",
          400: "#BC7F3E",
          500: "#9C6530",
          600: "#7C4F26",
          700: "#5F3C1D",
          800: "#452B15",
          900: "#2E1C0E",
        },
      },
      boxShadow: {
        soft: "0 4px 16px rgba(69, 43, 21, 0.08)",
        softLg: "0 12px 32px rgba(69, 43, 21, 0.12)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(6px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        popIn: {
          "0%": { opacity: 0, transform: "scale(0.96)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.35s ease-out",
        popIn: "popIn 0.2s ease-out",
      },
    },
  },
  plugins: [],
};