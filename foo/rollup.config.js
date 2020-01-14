import json from 'rollup-plugin-json'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import sass from 'rollup-plugin-sass'
import { eslint } from 'rollup-plugin-eslint'
import { terser } from 'rollup-plugin-terser'

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH

export default {
  input: 'main.js',
  output: [
    { file: 'dist/tqchart.js', format: 'es', name: 'TqChart' },
    { file: 'dist/tqchart.min.js', format: 'es', name: 'TqChart' }
  ],
  external: [
    'd3'
  ],
  plugins: [
    eslint({
      fix: true,
      include: ['src/**/*'],
      exclude: ['node_modules/**', 'src/*.scss']
    }),
    json(),
    resolve(), // so Rollup can find `ms`
    commonjs(), // so Rollup can convert `ms` to an ES module
    sass({
      output: 'dist/tqchart.css'
    }),
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    }),
    production && terser({
      include: [/^.+\.min\.js$/]
    }) // minify, but only in production
  ]
}
