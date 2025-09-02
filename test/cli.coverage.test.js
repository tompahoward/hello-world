import { describe, it, expect, vi } from 'vitest';
import path from 'path';
import { pathToFileURL } from 'url';

describe('coverage helper', () => {
  it('runs top-level CLI branch to increase coverage', async () => {
    const script = path.resolve('./src/index.js');
    const originalArg1 = process.argv[1];
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    try {
      // Make Node think the module was executed as a script
      process.argv[1] = script;
      // Append a query to force a fresh module evaluation
      const fileUrl = pathToFileURL(script).href + '?cov';
      await import(fileUrl);
      expect(logSpy).toHaveBeenCalledWith('Hello, World!');
    } finally {
      logSpy.mockRestore();
      process.argv[1] = originalArg1;
    }
  });
});
