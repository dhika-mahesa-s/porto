/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './src/**/*.{html,js,ts,jsx,tsx}',
    './scripts/**/*.{html,js,ts}',
    './public/**/*.html',
    './*.html'
  ],
  theme: {
    extend: {
      colors: {
        background: {
          dark: '#090d16',
          light: '#f8fafc'
        },
        surface: {
          dark: '#0f172a',
          light: '#ffffff'
        },
        accent: {
          DEFAULT: '#10b981', // Emerald 500
          light: '#34d399', // Emerald 400
          dark: '#059669', // Emerald 600
          muted: 'rgba(16, 185, 129, 0.12)'
        },
        border: {
          dark: '#1e293b',
          light: '#e2e8f0'
        }
      },
      fontFamily: {
        sans: [
          'Geist',
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif'
        ],
        mono: [
          '"JetBrains Mono"',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace'
        ]
      },
      maxWidth: {
        content: '1100px'
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' }
        }
      }
    }
  },
  plugins: []
};
