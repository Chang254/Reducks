import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'pink': '#EFA9BC',
        'blue': '#BAD7F2',
        'white': '#EFFAF4',
        'purple': '#B8A3B5',
        'black': '#191919'
      },
    },
  },
  plugins: [],
} satisfies Config;
