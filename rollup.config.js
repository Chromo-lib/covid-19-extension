import babel from "@rollup/plugin-babel";
import { nodeResolve } from '@rollup/plugin-node-resolve';
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import copy from 'rollup-plugin-copy'

export default {
  preserveEntrySignatures: false,
  inlineDynamicImports: true,
  input: "src/index.js",
  output: [
    {
      file: 'dist/index.js',
      format: "iife",
      sourcemap: false,
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'react-chartjs-2': 'react-chartjs-2'
      }
    }
  ],
  plugins: [
    copy({
      targets: [
        { src: 'public/*', dest: 'dist' }
      ]
    }),
    nodeResolve({
      browser: true,
    }),
    commonjs({
      // non-CommonJS modules will be ignored, but you can also
      // specifically include/exclude files
      include: 'node_modules/*/**'
    }),
    postcss({
      babelrc: false,
      plugins: [],
      extract: true,
      minimize: true,
      sourceMap: false,
      babelHelpers: 'runtime'
    }),
    babel({
      babelHelpers: 'runtime',
      presets: ["@babel/preset-env", "@babel/preset-react"],
      "plugins": [
        ["@babel/transform-runtime", {
          "regenerator": true
        }]
      ],
      extensions: ['js', 'jsx'],
      exclude: "node_modules/**"
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    terser()
  ]
};