const plugin = require('tailwindcss/plugin');

module.exports = {
  darkMode: 'class', // since you toggle dark with .dark class

  content: [
    './src/**/*.{js,ts,jsx,tsx}', // adjust paths as needed
    './components/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: 'var(--card)',
        'card-foreground': 'var(--card-foreground)',
        popover: 'var(--popover)',
        'popover-foreground': 'var(--popover-foreground)',
        primary: 'var(--primary)',
        'primary-foreground': 'var(--primary-foreground)',
        secondary: 'var(--secondary)',
        'secondary-foreground': 'var(--secondary-foreground)',
        muted: 'var(--muted)',
        'muted-foreground': 'var(--muted-foreground)',
        accent: 'var(--accent)',
        'accent-foreground': 'var(--accent-foreground)',
        destructive: 'var(--destructive)',
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
      },

      borderRadius: {
        DEFAULT: 'var(--radius)',
        lg: 'calc(var(--radius) + 0.25rem)',
        md: 'calc(var(--radius) - 0.125rem)',
        sm: 'calc(var(--radius) - 0.25rem)',
      },
      ringColor: {
        DEFAULT: 'var(--ring)',
      },
    },
  },

  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        '.bg-primary': {
          backgroundColor: 'var(--primary)',
        },
        '.text-primary': {
          color: 'var(--primary)',
        },
        '.border-primary': {
          borderColor: 'var(--primary)',
        },
      });
    }),
  ],
};