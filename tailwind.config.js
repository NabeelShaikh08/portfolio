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
        // Acid. Borrowed from Groundwork, where it earns its keep by meaning
        // exactly one thing: *this is actionable, or this is where you are*.
        // It is never a second heading colour, never a card fill, and never
        // two competing buttons in one viewport. 400 is the acid itself —
        // 16.8:1 on the void ground — and the darker steps exist for light
        // mode, where a fluorescent is unusable at full strength.
        primary: {
          50: '#FAFFE5',
          100: '#F3FFC2',
          200: '#E8FF8A',
          300: '#DDFF4D',
          400: '#CCFF00',
          500: '#B4E000',
          600: '#A9D400',
          700: '#7E9E00',
          800: '#627A05',
          900: '#4E610A',
          950: '#283303',
        },
        // Signal green, and it is a signal — the availability dot and the
        // shipped state, nothing else. Reserved rather than decorative, so
        // the acid keeps its monopoly on "act on this".
        accent: {
          50: '#EAFBF0',
          100: '#D0F6DE',
          200: '#A6EDC1',
          300: '#6BE28F',
          400: '#45CE72',
          500: '#2BB35B',
          600: '#1E8F49',
          700: '#1B713D',
          800: '#195A33',
          900: '#16492C',
          950: '#062915',
        },
        // Cool-neutral ramp. The ground is coal, faintly cool — never
        // #000000, which is the tell of a template, and never the neutral
        // grey of a dashboard. 50/300/400 are chalk, ash and slate: the three
        // ink values, each measured against the ground rather than picked by
        // eye. 400 is the floor — nothing dimmer carries body text.
        ink: {
          50: '#F4F4F1',
          100: '#E4E4E2',
          200: '#C9C9CE',
          300: '#A2A2AA',
          400: '#84848E',
          500: '#6B6B75',
          600: '#53535C',
          700: '#3B3B44',
          800: '#26262C',
          900: '#1A1A1F',
          950: '#0A0A0B',
        },
      },
      fontFamily: {
        // Three families, three jobs; a font used outside its job is a bug.
        // Inter was the previous body face and is the single loudest tell of
        // a generated page — it goes, along with the serif display.
        //
        // The mono is deliberately *not* Groundwork's Martian Mono. That site
        // and this one are both mine, and its design notes reserve JetBrains
        // Mono for the portfolio precisely so the two do not read as one
        // template wearing two palettes. Display and body are shared; the
        // structural voice is what keeps them apart.
        sans: ['"Instrument Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Bricolage Grotesque"', '"Arial Black"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
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
