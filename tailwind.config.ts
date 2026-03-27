const primaryPurple = {
  50: '#f3ebfa',
  100: '#e4d2f5',
  200: '#cca8eb',
  300: '#af79de',
  400: '#8e4ec9',
  500: '#6a24ab',
  600: '#4b0082',
  700: '#3f006f',
  800: '#32005a',
  900: '#260045',
  950: '#18002d',
}

const accentYellow = {
  50: '#fff8e1',
  100: '#ffefbe',
  200: '#ffe189',
  300: '#ffd44f',
  400: '#ffc926',
  500: '#ffc107',
  600: '#f5a000',
  700: '#c67a00',
  800: '#935800',
  900: '#5f3800',
  950: '#3b2200',
}

const brandPink = {
  50: '#fce4ec',
  100: '#f9c4d9',
  200: '#f48ab4',
  300: '#f06292',
  400: '#ec407a',
  500: '#e91e63',
  600: '#d81b60',
  700: '#c2185b',
  800: '#9c1451',
  900: '#6f0f3a',
  950: '#430924',
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blue: primaryPurple,
        indigo: primaryPurple,
        sky: primaryPurple,
        cyan: primaryPurple,
        teal: primaryPurple,
        emerald: primaryPurple,
        green: primaryPurple,
        purple: primaryPurple,
        violet: primaryPurple,
        amber: accentYellow,
        orange: accentYellow,
        yellow: accentYellow,
        pink: brandPink,
        rose: brandPink,
        fuchsia: brandPink,
        navy: primaryPurple,
      },
    },
  },
  plugins: [],
}
