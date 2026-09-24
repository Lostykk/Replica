import js from '@eslint/js';

export default [
  { ignores: ['node_modules/**', '.tools/**', '.agents/**', 'work/**', 'packages/**/*.ts'] },
  js.configs.recommended,
  { files: ['**/*.mjs'], languageOptions: { globals: { console: 'readonly', process: 'readonly', Buffer: 'readonly', URL: 'readonly' } } },
];
