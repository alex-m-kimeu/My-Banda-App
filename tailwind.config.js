/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'md': '0 0 10px rgba(0, 0, 0, 0.1)',
      },
      colors: {
        'Primary': '#ffffff',
        'Secondary': '#F3C82E',
        'Variant': '#000000',
        'Variant2': '#4B5563',
        'Variant3': '#F3F4F6',
        'Green': '#1F9254',
        'Red': '#FF3C5F',
        'Text': '#2d2e2e',
      },
      fontFamily:{
        'body': ['Poppins', 'sans-serif']
      }
    },
  },
  plugins: [],
}