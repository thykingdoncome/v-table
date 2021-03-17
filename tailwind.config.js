module.exports = {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {
        height: {
          fit: 'fit-content'
        },
        width: {
          fit: 'fit-content'
        },
        minHeight: {
          '100': '100px'
        }
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
  }