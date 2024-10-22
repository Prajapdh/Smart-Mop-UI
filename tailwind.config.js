/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class', // Enable dark mode
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6', // Blue
          dark: '#2563EB',
        },
        secondary: {
          DEFAULT: '#1F2937', // Dark gray
          light: '#374151',
        },
        accent: {
          DEFAULT: '#10B981', // Green
          dark: '#059669',
        },
        background: {
          light: '#F3F4F6',
          dark: '#111827',
        },
        text: {
          light: '#111827',
          dark: '#F9FAFB',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
        heading: ['Poppins', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}