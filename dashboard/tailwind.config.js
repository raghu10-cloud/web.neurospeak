/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#020617', // deep black-blue
        primary: '#A7F3D0',   // pastel mint - better bg contrast
        secondary: '#8B5CF6', // purple - AI
        alert: '#FF006E',     // pink/red - detection
        warning: '#FACC15',   // yellow - thresholds
        textPrimary: '#E2E8F0',
        textSecondary: '#94A3B8',
        card: '#0f172a',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
        tech: ['Orbitron', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
