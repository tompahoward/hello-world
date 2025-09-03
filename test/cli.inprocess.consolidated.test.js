import { describe, it, expect, vi } from 'vitest';
import { runCli } from '../src/index.js';
import { installConsoleLogSpy } from './utils/cli.js';

/**
 * Consolidated in-process CLI test
 *
 * This test merges the intent of the previous near-duplicate tests
 * (test/cli.inprocess.test.js and test/cli.coverage.test.js) into a single,
 * well-documented test that:
 *  - installs a console.log spy
 *  - invokes runCli() in-process
 *  - asserts the expected output is logged
 *
 * Keeping this single test avoids duplication while still exercising the
 * in-process execution path so coverage maps to src/index.js.
 */
describe('in-process CLI execution (consolidated)', () => {
  it('executes runCli and logs "Hello, World!"', async () => {
    const logSpy = installConsoleLogSpy(vi);
    try {
      // Call the exported entrypoint directly so coverage is recorded in-process
      await runCli();
      expect(logSpy).toHaveBeenCalledWith('Hello, World!');
    } finally {
      // Restore global state
      logSpy.mockRestore();
    }
  });
});
