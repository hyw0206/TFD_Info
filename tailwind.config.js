/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/*{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      flexBasis: {
        '1/10': '10%',
        '1/5': '20%',
      },
      screens: {
        'fix': '701px',
      },
      colors: {
        'darkbg': '#181818',
        'darkhf': '#202020',
        'darkdw': '#2a2a2a',
        'darkdd': '#3a3a3a',
        'navy': '#030621',
        'lightnavy': '#0f172a',
        'yellow': '#D1B700'
      },
      inset: {
        '10p': '10%',
      }
    },
  },
  plugins: [],
}
