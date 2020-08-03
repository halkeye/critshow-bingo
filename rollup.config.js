/* eslint-env node */
import filesize from 'rollup-plugin-filesize';
import {terser} from 'rollup-plugin-terser';
import resolve from 'rollup-plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import index from '@open-wc/rollup-plugin-html';
// https://github.com/open-wc/open-wc/tree/master/packages/rollup-plugin-html

export default {
  input: ['build/critshow-bingo-app.js'],
  output: {
    dir: 'dist',
    format: 'esm',
  },
  onwarn(warning) {
    if (warning.code !== 'THIS_IS_UNDEFINED') {
      console.error(`(!) ${warning.message}`);
    }
  },
  plugins: [
    index({
      files: ['dev/index.html'],
    }),
    replace({
      'Reflect.decorate': 'undefined',
      'process.env.NODE_ENV': JSON.stringify( 'production' )
    }),
    resolve(),
    terser({
      module: true,
      warnings: true,
      mangle: {
        properties: {
          regex: /^__/,
        },
      },
    }),
    filesize({
      showBrotliSize: true,
    }),
  ],
};
