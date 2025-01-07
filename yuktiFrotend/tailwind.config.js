import flowbite from "flowbite-react/tailwind"
/**  @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
     "./index.html",
     "./src/**/*.{js,jsx,ts,tsx}",
       flowbite.content(),],
  theme: {
    extend: {},
  },
  plugins: [flowbite.plugin(),],
}



