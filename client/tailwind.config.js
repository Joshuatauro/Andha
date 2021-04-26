module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'noto': ['"Inter"']
      },
      colors: {
        'white-bg': "#EEF0F1",
        'blue-special': "#3B49DF",
        'dark-primary': "#1F1D2B",
        'dark-post': "#252836",
        'dark-flair': "#353D5B",
        'light-flair': "#525FE6",
        'green-flair': "#00AE81"
      }
    },
  
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
