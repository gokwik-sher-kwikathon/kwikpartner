/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1890ff',
        secondary: '#001529',
      },
    },
  },
  plugins: [],
  // Important to prevent conflicts with Ant Design
  corePlugins: {
    preflight: false,
  },
};
