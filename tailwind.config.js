module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'], // Escanea todos los archivos en srcx
  //safelist: [{ pattern: /.*/ }], // Incluir TODAS las clases en modo desarrollo
  theme: {
    extend: {
      colors: {
        inf1: '#fbfbfb',
        inf2: '#c3cce9',
        inf3: '#b4c9ec',
        inf4: '#527dd6',
        inf5: '#457ad3',
        inf6: '#4776d3',
        inf7: '#3a6dd3'
      }
    }
  },
  plugins: []
}
