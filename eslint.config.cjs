// Flat config for ESLint v9+ to replace older .eslintrc.* usage
// This keeps linting functional in the CI and local environments for this small project.

module.exports = [
  // Ignore node_modules and generated coverage reports
  {
    ignores: ['node_modules/**', 'coverage/**'],
  },
  // Apply basic language options to all JS files
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        process: 'readonly',
        console: 'readonly',
        Buffer: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
      },
    },
    rules: {},
  },
];
