import type { Config } from 'tailwindcss';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'deep-sapphire-blue': '#1A3A6B',
        'emerald-green': '#2E8B57',
        'golden-yellow': '#FFD700',
        'warm-gray': '#8C8C8C',
        'mystic-teal': '#40E0D0',
        'midnight-purple': '#4B0082',
        'crimson-red': '#DC143C',
      },
      backgroundImage: {
        background: 'url("/images/skybox.jpg")',
        startbackground: 'url("/images/startscreen.jpg")',
      },
    },
  },
  plugins: [],
} satisfies Config;
