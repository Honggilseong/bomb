module.exports = {
  content: ["./src/**/*.tsx", "./public/index.html"],
  theme: {
    extend: {
      gridTemplateRows: {
        10: "repeat(10, minmax(0, 1fr))",
        layout: "200px minmax(900px, 1fr) 100px",
      },
      gridTemplateCols: {
        10: "repeat(10, minmax(0, 1fr))",
        layout: "200px minmax(900px, 1fr) 100px",
      },
    },
  },
  plugins: [],
};
