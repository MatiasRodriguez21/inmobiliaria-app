/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Habilitar el modo oscuro basado en clases
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Asegurar que TailwindCSS procese los archivos en src
    "./public/index.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

