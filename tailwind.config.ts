import colors from 'tailwindcss/colors'

const jpPrimary = {
  50: '#f9f3f4',
  100: '#f2e5e8',
  200: '#e5cbd2',
  300: '#d3a2ad',
  400: '#bb7384',
  500: '#9f485f',
  600: '#7a1f2b',
  700: '#671a24',
  800: '#52151d',
  900: '#3f1016',
  950: '#25090d',
}

const jpAccent = {
  50: '#fff9eb',
  100: '#fff2cf',
  200: '#ffe49d',
  300: '#ffd067',
  400: '#f3ba3c',
  500: '#dba126',
  600: '#b7821a',
  700: '#8f6315',
  800: '#66450f',
  900: '#3d2809',
  950: '#261905',
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      inherit: 'inherit',
      black: '#000',
      white: '#fff',
      ...colors,
      blue: jpPrimary,
      indigo: jpPrimary,
      sky: jpPrimary,
      cyan: jpPrimary,
      teal: jpPrimary,
      emerald: jpPrimary,
      green: jpPrimary,
      purple: jpPrimary,
      violet: jpPrimary,
      amber: jpAccent,
      orange: jpAccent,
      yellow: jpAccent,
      navy: {
        50: '#f9f3f4',
        100: '#f2e5e8',
        200: '#e5cbd2',
        300: '#d3a2ad',
        400: '#bb7384',
        500: '#9f485f',
        600: '#7a1f2b',
        700: '#671a24',
        800: '#52151d',
        900: '#3f1016',
        950: '#25090d',
      },
    },
  },
  plugins: [],
}
