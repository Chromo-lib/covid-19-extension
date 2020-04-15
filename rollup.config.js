import { terser } from 'rollup-plugin-terser';

export default [{ input: 'popup.js', },
{
  input: 'popup.js',
  output: [
    {
      name: 'covid',
      file: 'dist/popup.js',
      format: 'umd',
      plugins: [terser()]
    }
  ]
}];