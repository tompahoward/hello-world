import { describe, it, expect, vi } from 'vitest';
import path from 'path';
import { pathToFileURL } from 'url';

describe('in-process CLI execution', () => {
  it('executes top-level CLI branch and logs Hello, World!', async () => {
    const script = path.resolve('./src/index.js');
    const originalArg1 = process.argv[1];
    // Ensure console.log calls are captured but not printed during tests
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    try {
      // Set argv[1] to a path that endsWith('src/index.js') so the module's top-level branch runs
      process.argv[1] = script;
      // Append a query so Node treats this as a distinct module and will execute it even if previously imported
      const fileUrl = pathToFileURL(script).href + '?inproc';
      await import(fileUrl);
      expect(logSpy).toHaveBeenCalledWith('Hello, World!');
    } finally {
      // Restore global state
      logSpy.mockRestore();
      process.argv[1] = originalArg1;
    }
  });
});
