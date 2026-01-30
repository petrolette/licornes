import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'

export default {
  darkMode: ['class'],
  safelist: ['dark'],
  prefix: '',

  content: [],

  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      // Polices magiques
      fontFamily: {
        'magic': ['Bubblegum Sans', 'cursive'],
        'body': ['Quicksand', 'sans-serif']
      },
      // Couleurs du Royaume des Licornes
      colors: {
        // Couleurs principales
        'rose': {
          DEFAULT: '#FF69B4',
          light: '#FFB6C1',
          dark: '#FF1493',
          50: '#FFF0F5',
          100: '#FFE4EC',
          200: '#FFCCD8',
          300: '#FFB6C1',
          400: '#FF8CAB',
          500: '#FF69B4',
          600: '#FF1493',
          700: '#DB0A7B',
          800: '#B00864',
          900: '#87064D'
        },
        'violet': {
          DEFAULT: '#9B59B6',
          light: '#BB8FCE',
          dark: '#7D3C98',
          50: '#F5EEF8',
          100: '#EBDEF0',
          200: '#D7BDE2',
          300: '#BB8FCE',
          400: '#A569BD',
          500: '#9B59B6',
          600: '#7D3C98',
          700: '#6C3483',
          800: '#5B2C6F',
          900: '#4A235A'
        },
        'ciel': {
          DEFAULT: '#87CEEB',
          light: '#B0E2FF',
          dark: '#5CACEE'
        },
        'turquoise': {
          DEFAULT: '#40E0D0',
          light: '#7FFFD4',
          dark: '#00CED1'
        },
        // Arc-en-ciel
        'arc': {
          rouge: '#FF6B6B',
          orange: '#FFA500',
          jaune: '#FFD93D',
          vert: '#6BCB77',
          bleu: '#4D96FF',
          violet: '#9B59B6'
        },
        // Magiques
        'dore': '#FFD700',
        'argent': '#C0C0C0',
        'nuage': '#FFF8F0',
        // Shadcn compatibility
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        }
      },
      // Arrondis magiques
      borderRadius: {
        'magic': '2rem',
        'bubble': '3rem',
        xl: 'calc(var(--radius) + 4px)',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      // Ombres colorées
      boxShadow: {
        'magic': '0 10px 40px -10px rgba(255, 105, 180, 0.4)',
        'magic-lg': '0 20px 60px -15px rgba(255, 105, 180, 0.5)',
        'violet': '0 10px 40px -10px rgba(155, 89, 182, 0.4)',
        'rainbow': '0 10px 40px -10px rgba(255, 215, 0, 0.3), 0 5px 20px -5px rgba(255, 105, 180, 0.2)'
      },
      // Animations magiques
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        'sparkle': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(1.2)' }
        },
        'bounce-soft': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'wiggle': {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' }
        },
        'rainbow': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' }
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 105, 180, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 105, 180, 0.8)' }
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
        'bounce-soft': 'bounce-soft 2s ease-in-out infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'rainbow': 'rainbow 3s ease infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      },
      // Tailles tactiles
      spacing: {
        'touch': '60px',
        'touch-lg': '80px'
      }
    }
  },
  plugins: [animate]
} satisfies Config
