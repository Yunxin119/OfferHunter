import { forest } from 'daisyui/src/theming/themes';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['selector', '[data-mode="dark"]'],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
   themes: false,
  }
}

