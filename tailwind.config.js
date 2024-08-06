/** @type {import('tailwindcss').Config} */
module.exports = {
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
      },
      screens: {
        'fix': '701px',
      },
    },
  },
  plugins: [],
}
