import { terser } from 'rollup-plugin-terser';

export default {
  input: 'scripts/popup.js',
  output:
  {
    name: 'covid',
    file: 'public/popup.js',
    format: 'umd',
    plugins: [terser()]
  }
};