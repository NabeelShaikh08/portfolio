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
        // Verdigris — oxidised bronze. The primary voice: cool, technical,
        // and uncommon enough in developer portfolios to be recognisable.
        primary: {
          50: '#EFF8F5',
          100: '#D6EFE7',
          200: '#ADDFD0',
          300: '#7CC9B5',
          400: '#4FAF98',
          500: '#2E8B7A',
          600: '#1F6F63',
          700: '#14584E',
          800: '#114740',
          900: '#0F3A34',
          950: '#071E1B',
        },
        // Aged brass. Used sparingly — it is the metal against the patina,
        // so it marks the few things that genuinely deserve attention.
        accent: {
          50: '#FBF7EA',
          100: '#F6EDCE',
          200: '#EEDA9F',
          300: '#E3C77E',
          400: '#D6B361',
          500: '#C8A24A',
          600: '#A8843A',
          700: '#85662E',
          800: '#6A5127',
          900: '#584323',
          950: '#322512',
        },
        // Neutrals pulled a few degrees green so the greys sit in the same
        // temperature as the verdigris instead of fighting it.
        ink: {
          50: '#F4F6F4',
          100: '#E7ECE9',
          200: '#CFD8D4',
          300: '#AAB8B3',
          400: '#7C8D88',
          500: '#586764',
          600: '#40504C',
          700: '#2D3B37',
          800: '#1B2523',
          900: '#111917',
          950: '#0A100F',
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
        'spin-slow': 'spin 26s linear infinite',
        'drift': 'drift 14s ease-in-out infinite',
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
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) rotate(0deg)' },
          '50%': { transform: 'translate3d(0, -18px, 0) rotate(4deg)' },
        },
      },
    },
  },
  plugins: [],
}
