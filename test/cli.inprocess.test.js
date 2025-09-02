import { describe, it, expect, vi } from 'vitest';
import { runCli } from '../src/index.js';

describe('in-process CLI execution', () => {
  it('executes runCli and logs Hello, World!', async () => {
    // Ensure console.log calls are captured but not printed during tests
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
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
