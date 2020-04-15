import { terser } from 'rollup-plugin-terser';

export default [{ input: 'scripts/popup.js', },
{
  input: 'scripts/popup.js',
  output: [
    {
      name: 'covid',
      file: 'dist/popup.js',
      format: 'umd',
      plugins: [terser()]
    }
  ]
}];