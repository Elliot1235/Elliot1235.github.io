/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        "soft-green": "#e6f5ee",
        "panel-green": "#f1fbf5"
      }
    }
  },
  plugins: []
};

export default config;


