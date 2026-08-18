/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Copper / amber — the brand signature, carried over unchanged.
        primary: {
          50: '#FEF7ED',
          100: '#FDECD6',
          200: '#FAD5AC',
          300: '#F6B777',
          400: '#E08A3A',
          500: '#A75502',
          600: '#8F4802',
          700: '#753B02',
          800: '#5C2E01',
          900: '#4A2501',
          950: '#2D1600',
        },
        accent: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
          950: '#451A03',
        },
        // Warm neutral ramp. Tailwind's stock `neutral` is cool-grey and fights
        // the copper; every grey here is pulled a few degrees toward amber so
        // the whole page reads as one temperature.
        ink: {
          50: '#FAF7F2',
          100: '#F2ECE2',
          200: '#E3D9C9',
          300: '#C9BCA6',
          400: '#9C8D77',
          500: '#6F6253',
          600: '#4F453A',
          700: '#38302A',
          800: '#241E1A',
          900: '#161210',
          950: '#0B0807',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
      transitionTimingFunction: {
        // Slow-out ease used for every reveal, so motion across the site
        // shares one personality instead of each section easing differently.
        smooth: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'marquee': 'marquee 40s linear infinite',
        'pulse-ring': 'pulseRing 2.5s ease-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(1)', opacity: '0.6' },
          '100%': { transform: 'scale(2.4)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
