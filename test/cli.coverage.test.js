import { describe, it, expect, vi } from 'vitest';
import { runCli } from '../src/index.js';

describe('coverage helper', () => {
  it('runs top-level CLI branch to increase coverage', async () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    try {
      await runCli();
      expect(logSpy).toHaveBeenCalledWith('Hello, World!');
    } finally {
      logSpy.mockRestore();
    }
  });
});
