import path from 'path';
import { describe, it, expect, vi } from 'vitest';
import { installConsoleLogSpy, importFreshAsScript } from './utils/cli.js';

describe('top-level ESM evaluation', () => {
  it('evaluates top-level CLI branch by setting process.argv[1] and dynamically importing the module', async () => {
    const logSpy = installConsoleLogSpy(vi);

    const resolved = path.resolve('./src/index.js');
    const originalArg1 = process.argv[1];

    try {
      // Import the script as if it were executed directly. The helper will
      // temporarily set process.argv[1] and restore it when finished.
      await importFreshAsScript(resolved);

      expect(logSpy).toHaveBeenCalledWith('Hello, World!');
    } finally {
      // Restore the original argv and spy regardless of test outcome
      process.argv[1] = originalArg1;
      logSpy.mockRestore();
    }
  });
});
