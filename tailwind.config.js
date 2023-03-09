/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/*.{html, js}",
            "./views/*.ejs",
            "./views/partials/*.{ejs, html}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwindcss')
  ],
}
