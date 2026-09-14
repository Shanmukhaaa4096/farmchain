/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Agricultural Produce Palette (Requested by User)
        'blue-crate': '#293379',
        'tomato-red': '#B81817',
        'citrus-yellow': '#E6A300',
        'lettuce-green': '#A6AF32',
        'green-beans': '#607829',
        'orange-accent': '#EE7302',
        'paper-cream': '#FAF7F0',
        'paper-white': '#FFFFFF',
        'ink-black': '#111111',

        // Theme Mapping Aliases (Preserves existing component contracts while adopting the new palette)
        'farm-green': '#293379',        // Primary Blue Crate
        'farm-green-dark': '#1F2444',   // Deep Blue Crate Tone
        'farm-green-light': '#607829',  // Green Beans
        'farm-green-pale': '#F2F5E8',   // Light Lettuce Tint
        'earth-green': '#607829',       // Green Beans
        'warm-cream': '#FAF7F0',        // Field Notebook Paper
        'warm-cream-dark': '#EFE9DA',   // Kraft Paper Accent
        'harvest-yellow': '#E6A300',    // Citrus Yellow
        'harvest-yellow-hover': '#CE9200',
        'soil-brown': '#607829',        // Green Beans Tone
        'soil-brown-light': '#A6AF32',  // Lettuce Green Tone
        'grain-gold': '#EE7302',        // Energetic Orange Accent
        'rust-red': '#B81817',          // Tomato Red
        'terminal-green': '#A6AF32',    // Lettuce Green Accent
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        sketch: ['Caveat', 'cursive'],
      },
      boxShadow: {
        'brutal': '5px 5px 0px #111111',
        'brutal-sm': '3px 3px 0px #111111',
        'brutal-lg': '8px 8px 0px #111111',
        'brutal-blue': '5px 5px 0px #293379',
        'brutal-yellow': '5px 5px 0px #E6A300',
        'brutal-red': '5px 5px 0px #B81817',
        'brutal-green': '5px 5px 0px #607829',
        'brutal-orange': '5px 5px 0px #EE7302',
        'brutal-active': '0px 0px 0px #111111',
      },
      borderWidth: {
        '3': '3px',
      }
    },
  },
  plugins: [],
}
