/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'text': '#f3e2f2',
        'background': '#0b050b',
        'primary': '#03b2b5',
        'secondary': '#361735',
        'accent': '#fb18f7',
      },
      fontFamily: {
        sans: ['sans-serif'],
        poppins: ['var(--font-poppins)', 'sans-serif'],
        ubuntu: ['var(--font-ubuntu)', 'sans-serif']
      }
    },
  },
  plugins: [],
}
