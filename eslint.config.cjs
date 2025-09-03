// Flat config for ESLint v9+ to replace older .eslintrc.* usage
// This keeps linting functional in the CI and local environments for this small project.

module.exports = [
  // Ignore node_modules and generated coverage reports
  {
    ignores: [
      'node_modules/**',
      'coverage/**',
      'dist/**',
      'remote.git/**',
      '.voder/**',
      '.env',
    ],
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
    rules: {
      // Encourage using const when variables are not reassigned
      'prefer-const': 'error',

      // Disallow duplicate imports which are often accidental
      'no-duplicate-imports': 'error',

      // Warn on unused variables (but allow unused leading-underscore args)
      'no-unused-vars': [
        'warn',
        { args: 'after-used', argsIgnorePattern: '^_' },
      ],

      // Enforce === and !== for safer equality checks
      eqeqeq: 'error',
    },
  },
];
