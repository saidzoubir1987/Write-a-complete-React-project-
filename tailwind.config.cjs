/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './**/*.{ts,tsx}',
    '!./node_modules/**',
    '!./dist/**',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
