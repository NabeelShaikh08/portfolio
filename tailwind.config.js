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
        // Signal orange. Fluorescent, but deliberately not Groundwork's acid —
        // that site and this one are both mine, and sharing a ground, an
        // accent and both typefaces would make the portfolio a recolour of the
        // studio rather than its own thing. Warm also runs against the
        // category: developer portfolios reach for lime, cyan or violet almost
        // without exception, so orange reads as a decision.
        //
        // The role is unchanged and it is the part that matters: this colour
        // means *actionable, or where you are*. One per viewport.
        primary: {
          50: '#FFF1EB',
          100: '#FFE0D2',
          200: '#FFBFA4',
          300: '#FF9A6E',
          400: '#FF7538',
          500: '#FF5A1F',
          600: '#E8420B',
          700: '#BC3208',
          800: '#94290B',
          900: '#78240E',
          950: '#3F1004',
        },
        // Live aqua. The availability signal and nothing else — a dot and a
        // text colour, never a fill. Cool against the warm accent so the two
        // can never be mistaken for each other at a glance.
        accent: {
          50: '#E8FBF8',
          100: '#C9F5EE',
          200: '#97EADF',
          300: '#5FDCCC',
          400: '#2BC4B2',
          500: '#14A594',
          600: '#0D8577',
          700: '#0E6A60',
          800: '#10554E',
          900: '#114641',
          950: '#032926',
        },
        // Warm-neutral ramp. Groundwork's greys are faintly cool because its
        // accent is; ours lean the other way for the same reason, so the
        // orange sits on the ground instead of drifting toward it. 50/300/400
        // are the three ink values, each measured against the ground rather
        // than picked by eye — 400 is the floor, and nothing dimmer carries
        // body text.
        ink: {
          50: '#F7F5F2',
          100: '#EAE7E2',
          200: '#D2CEC8',
          300: '#A8A29A',
          400: '#8A847B',
          500: '#6B655D',
          600: '#514C46',
          700: '#3A3733',
          800: '#262421',
          900: '#1A1815',
          950: '#0B0A0A',
        },
      },
      fontFamily: {
        // Three families, three jobs. All three are chosen against Groundwork
        // rather than from it: Bricolage and Instrument Sans are that site's
        // display and body, and wearing both here would have left the two
        // indistinguishable in everything but hue.
        //
        // Syne is the formal break. Bricolage is a chunky workhorse grotesque;
        // Syne is wide, slightly strange, and unmistakably *set* — which is
        // what a name at 120px should be. Archivo carries prose without
        // opinions. Inter stays banned: it is the default AI aesthetic.
        sans: ['Archivo', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Syne', '"Arial Black"', 'sans-serif'],
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
