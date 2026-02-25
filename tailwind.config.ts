import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#080810',
        surface: '#0e0d1a',
        card: '#13121f',
        border: '#1e1b33',
        'border-glow': '#3b2d6e',
        accent: '#7c3aed',
        'accent-light': '#a855f7',
        muted: '#4b4870',
        secondary: '#7b789a',
        foreground: '#ddd8f0',
        bright: '#f0ecff',
      },
      fontFamily: {
        display: ['Cinzel', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-sm': '0 0 12px rgba(124, 58, 237, 0.2)',
        'glow': '0 0 24px rgba(124, 58, 237, 0.3)',
        'glow-lg': '0 0 48px rgba(124, 58, 237, 0.4)',
      },
      backgroundImage: {
        'arcane-gradient': 'radial-gradient(ellipse at top, #1a1035 0%, #080810 60%)',
      },
    },
  },
  plugins: [],
}

export default config
