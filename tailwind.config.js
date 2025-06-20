/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // SimplyKI Brand Colors
      colors: {
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#667eea', // Primary blue
          600: '#5a67d8',
          700: '#4c51bf',
          800: '#434190',
          900: '#3c366b',
        },
        purple: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#764ba2', // Primary purple
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6b21a8',
          900: '#581c87',
        },
        accent: {
          pink: '#f093fb',
          coral: '#f5576c'
        },
        success: '#38ef7d',
        warning: '#ffd93d',
        error: '#ff6b6b',
        
        // Neutral colors
        background: '#ffffff',
        'background-alt': '#f8f9fa',
        'background-dark': '#1a1d29',
        surface: '#ffffff',
        'surface-elevated': '#f8f9fa',
        'surface-dark': '#2d3748',
        
        // Text colors
        'text-primary': '#2c3e50',
        'text-secondary': '#666666',
        'text-muted': '#8892b0',
        'text-inverse': '#ffffff',
        'text-brand': '#667eea',
      },
      
      // Typography
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      
      // Fluid typography
      fontSize: {
        'hero': ['clamp(2rem, 5vw, 4rem)', { lineHeight: '1.1', fontWeight: '700' }],
        'title': ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.2', fontWeight: '600' }],
        'subtitle': ['clamp(1rem, 2vw, 1.25rem)', { lineHeight: '1.4', fontWeight: '500' }],
      },
      
      // Gradients
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #667eea, #764ba2)',
        'gradient-accent': 'linear-gradient(135deg, #f093fb, #f5576c)',
        'gradient-text': 'linear-gradient(90deg, #667eea, #764ba2)',
        'gradient-hero': 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      },
      
      // Box shadows
      boxShadow: {
        'sm': '0 2px 4px rgba(102, 126, 234, 0.08)',
        'md': '0 4px 12px rgba(102, 126, 234, 0.12)',
        'lg': '0 8px 24px rgba(102, 126, 234, 0.16)',
        'xl': '0 16px 48px rgba(102, 126, 234, 0.2)',
        'inner': 'inset 0 2px 4px 0 rgba(102, 126, 234, 0.06)',
      },
      
      // Border radius
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '20px',
      },
      
      // Spacing scale
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },
      
      // Animation
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'bounce-slow': 'bounce 2s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
      },
      
      // Custom keyframes
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '25%': { transform: 'translateY(-10px) rotate(1deg)' },
          '50%': { transform: 'translateY(-5px) rotate(-1deg)' },
          '75%': { transform: 'translateY(-15px) rotate(0.5deg)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      
      // Screen sizes
      screens: {
        'xs': '475px',
        '3xl': '1600px',
      },
      
      // Container
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1400px',
        },
      },
      
      // Backdrop blur
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [
    // Custom utilities
    function({ addUtilities, theme }) {
      const newUtilities = {
        // Gradient text
        '.text-gradient': {
          background: theme('backgroundImage.gradient-text'),
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        
        // Glassmorphism
        '.glass': {
          background: 'rgba(255, 255, 255, 0.1)',
          'backdrop-filter': 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        },
        
        // Button styles
        '.btn-primary': {
          background: theme('backgroundImage.gradient-primary'),
          color: theme('colors.text-inverse'),
          border: 'none',
          padding: `${theme('spacing.3')} ${theme('spacing.6')}`,
          borderRadius: theme('borderRadius.md'),
          fontWeight: theme('fontWeight.semibold'),
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: theme('boxShadow.lg'),
          },
        },
        
        '.btn-secondary': {
          background: 'transparent',
          color: theme('colors.primary.500'),
          border: `2px solid ${theme('colors.primary.500')}`,
          padding: `${theme('spacing.3')} ${theme('spacing.6')}`,
          borderRadius: theme('borderRadius.md'),
          fontWeight: theme('fontWeight.semibold'),
          transition: 'all 0.3s ease',
          '&:hover': {
            background: theme('colors.primary.500'),
            color: theme('colors.text-inverse'),
          },
        },
        
        // Card styles
        '.card': {
          background: theme('colors.surface'),
          borderRadius: theme('borderRadius.lg'),
          padding: theme('spacing.6'),
          boxShadow: theme('boxShadow.md'),
          border: `1px solid ${theme('colors.gray.200')}`,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: theme('boxShadow.lg'),
            borderColor: theme('colors.primary.500'),
          },
        },
        
        // Status indicators
        '.status-online': {
          color: theme('colors.success'),
          backgroundColor: `${theme('colors.success')}1a`, // 10% opacity
        },
        '.status-warning': {
          color: theme('colors.warning'),
          backgroundColor: `${theme('colors.warning')}1a`,
        },
        '.status-error': {
          color: theme('colors.error'),
          backgroundColor: `${theme('colors.error')}1a`,
        },
      }
      
      addUtilities(newUtilities)
    }
  ],
}