module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'noto': ['"Noto Sans"']
      },
      colors: {
        'white-bg': "#EEF0F1",
        'blue-special': "#3B49DF"
      }
    },
  
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
