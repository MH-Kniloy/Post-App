/** @type {import('tailwindcss').Config} */
import profile from "../../assets/profile.png";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "cover-photo": "url('src/assets/cover.png')",
        "profile": "url('src/assets/profile.png')",
         
      },
    },
  },
  plugins: [],
};
