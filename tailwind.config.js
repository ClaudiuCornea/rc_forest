/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        club: {
          red: 'var(--primary-color)',
          darkred: '#8B0000',
          black: 'var(--background-color)',
          offblack: 'var(--off-black-color)',
          white: 'var(--text-white-color)',
          gray: 'var(--text-gray-color)',
          success: 'var(--success-color)',
          error: 'var(--error-color)',
        }
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        cond: ['"Barlow Condensed"', 'sans-serif'],
        body: ['"Barlow"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
