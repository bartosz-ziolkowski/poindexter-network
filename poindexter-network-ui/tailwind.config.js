/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    fontFamily: {
      "pt-serif": ["PT Serif", "serif"],
      montserrat: ["Montserrat", "sans-serif"],
    },
    backgroundSize: {
      auto: "auto",
      cover: "cover",
      contain: "contain",
      "100%": "100%",
    },
    extend: {
      backgroundImage: {
        underline1: "url('/dist/assets/Underline1.svg')",
        underline2: "url('/dist/assets/Underline2.svg')",
        underline3: "url('/dist/assets/Underline3.svg')",
        underline4: "url('/dist/assets/Underline4.svg')",
        highlight3: "url('/dist/assets/Highlight3.svg')",
      },
      colors: {
        secondary: "#F4F2ED",
        gray: {
          900: "#111827",
        },
        black: "black",
        white: "white",
        orange: "#FF3B00",
        beige: "#F4F0E6",
        purple: "#4E4187",
        blue: "#3083DC",
        green: "#43AA8B",
      },
      keyframes: {
        "fade-in-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "fade-in-down": "fade-in-down 0.5s ease-out",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
