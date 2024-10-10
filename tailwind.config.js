/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,svelte,js,ts}'],
  theme: {
    extend: {
      boxShadow: {
        'even': '2px 2px 12px 0 rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}

