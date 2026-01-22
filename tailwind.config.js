/** @type {import('tailwindcss').Config} */
export default {
  purge:false,
  content: [
    './views/**/*.ejs',
    './views/partials/**/*.ejs',
  ],
  theme: {
    extend: {
      backgroundGradient:{
        'gradient-to-b': 'radial-gradient(circle, #DC143C, #ADD8E6)',
      },
      colors: {
        primary: '#DC143C',
        secondary: '#ADD8E6',
      },
    },  
  },
  plugins: [

  ],
};
