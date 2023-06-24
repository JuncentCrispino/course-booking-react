const hex = {
  primary: '#072f49',
  secondary: '#f5a200',
  tertiary: '#bae6fd',
};

module.exports = {
  content: ['index.html', './src/**/*.{js,jsx,ts,tsx,vue,html}'],
  theme: {
    extend: {
      textColor: hex,
      backgroundColor: hex,
      outlineColor: hex,
      ringColor: hex,
      borderColor: hex,
      fill: hex,
    },
  },
  plugins: [],
};
