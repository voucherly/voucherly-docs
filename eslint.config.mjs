// Flat config. Copre i sorgenti TS/TSX di src/ e i file di configurazione TS
// alla radice. I file generati (docs/api/webapi/**) e gli artefatti di build
// sono esclusi: si rigenerano, non si correggono a mano.
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import globals from 'globals';

export default tseslint.config(
  {
    ignores: [
      'build/**',
      '.docusaurus/**',
      'node_modules/**',
      'docs/api/webapi/**',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {react},
    languageOptions: {
      globals: {...globals.browser, ...globals.node},
      parserOptions: {ecmaFeatures: {jsx: true}},
    },
    settings: {react: {version: 'detect'}},
    rules: {
      ...react.configs.flat.recommended.rules,
      // Docusaurus usa il JSX transform automatico: React non va importato.
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', {argsIgnorePattern: '^_'}],
    },
  },
  {
    files: ['*.mjs'],
    languageOptions: {globals: globals.node},
  },
);
