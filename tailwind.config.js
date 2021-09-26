module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  mode: "jit",
  theme: {
    fontFamily: { sans: "Inter var" },
    extend: {
      colors: {
        primary: {
          300: "var(--primary300)",
        },
        secondary: {
          bg: "var(--bg)",
          heading: "var(--offWhite)",
          placeholder: "var(--placeholder)",
          line: "var(--line)",
          deemphasised: "var(--deemphasised)",
        },
        grayscale: {
          DEFAULT: "#BCBDC2",
          50: "#F8F8F9",
          100: "#F2F2F3",
          200: "#E4E5E7",
          300: "#D7D8DB",
          400: "#CACACE",
          600: "#8C8E96",
          700: "#5F6068",
          800: "#333438",
          900: "#050505",
        },
      },
      borderWidth: {
        1: "1px",
      },
    },
    variants: {
      extend: {},
    },
  },
  plugins: [],
};
