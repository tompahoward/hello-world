import { describe, it, expect, vi } from 'vitest'
import { importFreshAsScript, installConsoleLogSpy } from './utils/cli.js'

describe('top-level ESM evaluation', () => {
  it('evaluates top-level CLI branch by setting process.argv[1] and dynamically importing the module', async () => {
    const logSpy = installConsoleLogSpy(vi)

    try {
      // Import the script as if it were executed directly. The helper sets
      // process.argv[1] and adds a cache-busting query so Node evaluates the
      // module fresh even if previously imported.
      await importFreshAsScript('./src/index.js')

      expect(logSpy).toHaveBeenCalledWith('Hello, World!')
    } finally {
      // Restore the spy regardless of test outcome
      logSpy.mockRestore()
    }
  })
})
