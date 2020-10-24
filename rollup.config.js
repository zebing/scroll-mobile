import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';
import url from '@rollup/plugin-url';
import typescript from '@rollup/plugin-typescript';

const plugins = [
  json(),
  resolve(),
  url(),
  typescript(),
  commonjs(),
]

const external = [];
module.exports = {
  input: 'src/index.ts',
  output: {
    // file: 'dist/index.js',
    dir: 'dist',
    format: 'cjs'
  },
  external,
  plugins,
}