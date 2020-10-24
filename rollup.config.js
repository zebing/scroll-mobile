import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';
import url from '@rollup/plugin-url';

const external = [];
const plugins = [
  json(),
  resolve(),
  url(),
  getBabelOutputPlugin({
    presets: [
      "@babel/preset-env"
    ],
    plugins: [
      ["@babel/plugin-proposal-decorators", {"legacy": true}],
      ["@babel/plugin-proposal-class-properties", {"loose": true}],
      ["@babel/plugin-proposal-pipeline-operator", {"proposal": "minimal"}],
      ["@babel/plugin-transform-runtime"]
    ]
  }),
  commonjs(),
];

if (process.env.BUILD_ENV === 'production') {
  plugins.push(uglify());
}

module.exports = {
  input: 'src/index.js',
  output: {
    dir: 'dist',
    format: 'cjs'
  },
  external,
  plugins,
}