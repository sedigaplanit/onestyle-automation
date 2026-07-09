import playwright from 'eslint-plugin-playwright';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  playwright.configs['flat/recommended'],
  eslintConfigPrettier,
  {
    rules: {
      'playwright/no-focused-test': 'error', // Prevents committing .only tests
      'playwright/prefer-lowercase-title': 'warn',
    },
  },
];