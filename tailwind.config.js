const path = require('path');

module.exports = {
  content: [
    path.join(__dirname, 'views/**/*.ejs'),
    path.join(__dirname, 'public/**/*.js'),
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1DA1F2',
        secondary: '#14171A',
        accent: '#657786',
        muted: '#AAB8C2',
        'light-gray': '#E1E8ED',
        'extra-light-gray': '#F5F8FA',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
};
