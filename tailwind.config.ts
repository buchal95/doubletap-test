import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'anton': ['var(--font-anton)', 'sans-serif'],
        'montserrat': ['var(--font-montserrat)', 'sans-serif'],
        sans: [
          'var(--font-montserrat)',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          '"Fira Sans"',
          '"Droid Sans"',
          '"Helvetica Neue"',
          'sans-serif'
        ],
      },
      colors: {
        'brand': {
          'gray': '#1C1C1C',
          'beige': '#EDE7DC',
          'red': '#FF3B30',
          'olive': '#A8B400'
        },
        primary: {
          DEFAULT: '#1C1C1C',
          light: '#2C2C2C',
          dark: '#0C0C0C',
        },
        secondary: {
          DEFAULT: '#A8B400',
          light: '#B8C400',
          dark: '#889200',
        },
        accent: {
          DEFAULT: '#FF3B30',
          light: '#FF5B50',
          dark: '#E02B20',
        },
        neutral: {
          DEFAULT: '#EDE7DC',
          light: '#F5F1E8',
          dark: '#E0D9CC',
        },
      },
      aspectRatio: {
        'w-16': '16/9',
        'h-9': '9/16',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-in-out',
        'pulse-custom': 'pulseCustom 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'gradient': 'gradient 15s ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseCustom: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      transitionProperty: {
        'transform-opacity': 'transform, opacity',
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
  },
  plugins: [],
}

export default config