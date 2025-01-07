const flowbite = require("flowbite-react/tailwind");
/**  @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [ "./src/**/*.{js,jsx,ts,tsx}",  flowbite.content(),],
  theme: {
    extend: {},
  },
  plugins: [flowbite.plugin(),],
}



