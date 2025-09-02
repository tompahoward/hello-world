import { describe, it, expect, vi } from 'vitest';
import { runCli } from '../src/index.js';
import { installConsoleLogSpy } from './utils/cli.js';

describe('in-process CLI execution', () => {
  it('executes runCli and logs Hello, World!', async () => {
    // Use the shared helper to install a console.log spy and keep tests concise
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
