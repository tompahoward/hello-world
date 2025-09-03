import { describe, it, expect, vi } from 'vitest';
import { runCli } from '../src/index.js';
import { installConsoleLogSpy } from './utils/cli.js';

describe('coverage helper', () => {
  it('runs top-level CLI branch to increase coverage', async () => {
    const logSpy = installConsoleLogSpy(vi);
    try {
      await runCli();
      expect(logSpy).toHaveBeenCalledWith('Hello, World!');
    } finally {
      logSpy.mockRestore();
    }
  });
});
