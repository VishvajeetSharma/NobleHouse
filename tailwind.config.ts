export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#db2777",
        secondary: "#9333ea",
        PinkFont: "#f633b4",
      },

      backgroundImage: {
        "primary-gradient":
          "linear-gradient(135deg, #db2777, #9333ea)",

        "primary-light-gradient":
          "linear-gradient(135deg, #fdf2f8, #f3e8ff)",
      },

      backgroundColor: {
        "primary-pink": "#f633b4",
      },
    },
  },
};