import { defineConfig } from 'vitest/config';

// Vitest configuration to enable V8-based coverage reporting and thresholds.
export default defineConfig({
  test: {
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      reportsDirectory: 'coverage',
      // conservative thresholds to prevent regressions
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
});
