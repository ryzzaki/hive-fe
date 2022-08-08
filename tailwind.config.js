const genSizes = () => {
  const generatedSizes = {};
  for (let i = 1; i <= 1500; i++) {
    if (i > 110 && i < 225) i += 4;
    if (i > 225) i += 24;
    if (i <= 200) {
      generatedSizes[`${i}rem`] = `${i}rem`;
    }
    generatedSizes[i] = `${i}px`;
  }
  return generatedSizes;
};

const genScales = () => {
  const generatedScales = {};
  for (let i = 1; i <= 200; i++) {
    generatedScales[i] = `${i / 100}`;
  }
  return generatedScales;
};

const sizes = genSizes();
const scales = genScales();

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/pages/**/*.{js,jsx,ts,tsx}', './src/components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      scale: scales,
      spacing: sizes,
      fontSize: sizes,
      maxHeight: sizes,
      maxWidth: sizes,
      minHeight: sizes,
      minWidth: sizes,
      colors: {
        offwhite: { DEFAULT: '#f7eed5' },
      },
      animation: {
        'spin-slow': 'spin 5s linear infinite',
      },
    },
  },
  plugins: [],
};
