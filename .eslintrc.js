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
    'eslint:recommended',
    'plugin:lit/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'lit'],
  rules: {
    indent: ['error', 2],
    'key-spacing': ['error', { beforeColon: false, afterColon: true }],
    'quote-props': ['error', 'as-needed'],
    quotes: [1, 'single', { avoidEscape: false, allowTemplateLiterals: true }],
    semi: [2, 'always'],
    'no-unexpected-multiline': 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_'
      }
    ]
  }
};