import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
import typography from '@tailwindcss/typography'

export default {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './app/**/*.{js,ts,jsx,tsx}'],
  plugins: [typography],
  theme: {
    extend: {
      colors: {},
      fontFamily: {
        sans: ['var(--font-inter)', ...defaultTheme.fontFamily.sans]
      }
    }
  }
} satisfies Config
