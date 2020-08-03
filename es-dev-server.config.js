/* eslint-env node */
const replace = require('@rollup/plugin-replace');
const { wrapRollupPlugin } = require('es-dev-server-rollup');

module.exports = {
  port: 3000,
  nodeResolve: true,
  plugins: [
    wrapRollupPlugin(
      replace({ 
        include: ['src/**/*.js'],
        __environment__: '"development"'
      })
    ),
  ],
  moduleDirs: ['node_modules'],
};