import path from 'path'
import { pathToFileURL } from 'url'
import { describe, it, expect, vi } from 'vitest'
import { installConsoleLogSpy } from './utils/cli.js'

describe('top-level ESM evaluation', () => {
  it('evaluates top-level CLI branch by setting process.argv[1] and dynamically importing the module', async () => {
    const logSpy = installConsoleLogSpy(vi)

    const resolved = path.resolve('./src/index.js')
    const originalArg1 = process.argv[1]

    try {
      // Ensure the path uses forward slashes so the endsWith('src/index.js') check
      // in src/index.js will match on all platforms (Windows uses backslashes).
      process.argv[1] = resolved.split(path.sep).join('/')

      // Import the script as if it were executed directly. Use a cache-busting
      // query so Node evaluates the module fresh even if previously imported.
      const fileUrl = pathToFileURL(resolved).href + `?cachebust=${Date.now()}`
      await import(fileUrl)

      expect(logSpy).toHaveBeenCalledWith('Hello, World!')
    } finally {
      // Restore the original argv and spy regardless of test outcome
      process.argv[1] = originalArg1
      logSpy.mockRestore()
    }
  })
})
