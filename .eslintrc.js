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
    quotes: [1, 'single', { avoidEscape: false, allowTemplateLiterals: true }],
    semi: [2, 'always'],
    'class-methods-use-this': ['off'],
    // 'no-unexpected-multiline': 'off',
    // '@typescript-eslint/indent': 'off',
    // '@typescript-eslint/explicit-function-return-type': 'off',
    // '@typescript-eslint/no-non-null-assertion': 'off',
    // '@typescript-eslint/no-use-before-define': 'off',
    // '@typescript-eslint/no-unused-vars': [
    //   'warn',
    //   {
    //     argsIgnorePattern: '^_'
    //   }
    // ]
  }
};