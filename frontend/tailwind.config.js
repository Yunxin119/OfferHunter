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
    themes: [
      {
        pastel: {
          ...require("daisyui/src/theming/themes")["pastel"],
          'base-200': '#f9dddb',
          'base-100': '#fbfbf0',
          'base-300': '#fceff4',
        },
      },
      {
        forest: {
          ...require("daisyui/src/theming/themes")["forest"],
          'base-200': '#005348',
          'base-100':'#292e2f'
        }
      }
    ]
  }
}

