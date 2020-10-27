import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';
import url from '@rollup/plugin-url';
import VuePlugin from 'rollup-plugin-vue';
import scss from 'rollup-plugin-scss'

const external = [];
const plugins = [
  json(),
  resolve({
    extensions: [ '.mjs', '.js', '.jsx', '.json', '.vue' ]
  }),
  commonjs(),
  url(),
  getBabelOutputPlugin({
    presets: [
      "@babel/preset-env",
    ],
    plugins: [
      ["@babel/plugin-proposal-decorators", {"legacy": true}],
      ["@babel/plugin-proposal-class-properties", {"loose": true}],
      ["@babel/plugin-proposal-pipeline-operator", {"proposal": "minimal"}],
      ["@babel/plugin-transform-runtime"]
    ]
  }),
  scss({ output: 'dist/scroll-mobile.css' }),
  VuePlugin({
    css: false,
  }),
];

if (process.env.BUILD_ENV === 'production') {
  plugins.push(uglify());
}

module.exports = {
  input: 'src/index.js',
  output: {
    dir: 'dist',
    format: 'cjs',
    exports: 'named',
  },
  external,
  plugins,
}