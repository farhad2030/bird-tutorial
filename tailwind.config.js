module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#bef792",
          secondary: "#f6d860",
          accent: "#e6e8eb",
          neutral: "#3d4451",
          "base-100": "#ffffff",
        },
        myDark: {
          primary: "#41086d",
          secondary: "#09279f",
          accent: "#e6e8eb",
          neutral: "#c2bbae",
          "base-100": "#040217",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
