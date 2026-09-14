/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'farm-green': '#173B2B',
        'farm-green-dark': '#0F271C',
        'farm-green-light': '#2E6B4F',
        'farm-green-pale': '#E9F0EC',
        'earth-green': '#234E39',
        'warm-cream': '#F5F0E6',
        'warm-cream-dark': '#EADEC9',
        'harvest-yellow': '#F4C542',
        'harvest-yellow-hover': '#E5B533',
        'soil-brown': '#4A3525',
        'soil-brown-light': '#6A4E38',
        'grain-gold': '#D4A338',
        'ink-black': '#111111',
        'paper-white': '#FFFFFF',
        'rust-red': '#D9483B',
        'terminal-green': '#00E676',
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'brutal': '6px 6px 0px #111111',
        'brutal-sm': '3px 3px 0px #111111',
        'brutal-lg': '10px 10px 0px #111111',
        'brutal-yellow': '6px 6px 0px #F4C542',
        'brutal-green': '6px 6px 0px #173B2B',
        'brutal-soil': '6px 6px 0px #4A3525',
        'brutal-white': '6px 6px 0px #FFFFFF',
        'brutal-active': '0px 0px 0px #111111',
      },
      borderWidth: {
        '3': '3px',
      }
    },
  },
  plugins: [],
}
