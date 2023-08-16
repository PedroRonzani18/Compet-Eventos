import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        img_bg_blue: "url('/images.jpg')",
        "img-bg-compet":"url(https://i.ibb.co/jhYMwNw/Fundo-Azul.jpg)"
      },
      colors: {
        paper: "#F5F5F5",
        primary: "#19DD39",
        secondary: "#004266",
        "primary-blue": "#191970",
        "primary-white": "#FFFFFF",
        "primary-green": "#32CD32",
      },
    },
  },
  plugins: [],
};
export default config;
