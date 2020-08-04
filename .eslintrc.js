/* eslint-env node */
module.exports = {
  overrides: [
    {
      files: [
        'src/test/**/*',
      ],
      globals: {
      },
      env: {
        mocha: true,
      },
      rules: {
      },
    },
  ],
  extends: [
    '@open-wc/eslint-config',
    'airbnb-typescript/base',
    'plugin:lit/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'lit'],
  rules: {
    "wc/guard-super-call": ["off"],
    "object-property-newline": ["error", { "allowAllPropertiesOnSameLine": false }],
    "object-curly-spacing": ["error", "always"],
    "object-curly-newline": ["error", {
      "ObjectExpression": { "multiline": true, "minProperties": 3 },
      "ObjectPattern": { "multiline": true, "minProperties": 3 },
      "ImportDeclaration": { "multiline": true, "minProperties": 3 },
      "ExportDeclaration": { "multiline": true, "minProperties": 3 }
    }],
    quotes: [1, 'single', { avoidEscape: false, allowTemplateLiterals: true }],
    semi: [2, 'always'],
    'class-methods-use-this': ['off'],
  }
};