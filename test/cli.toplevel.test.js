import { describe, it, expect, vi } from 'vitest'
import path from 'path'
import { pathToFileURL } from 'url'

describe('top-level ESM evaluation', () => {
  it('evaluates top-level CLI branch by setting process.argv[1] and dynamically importing the module', async () => {
    const script = path.resolve('./src/index.js')
    // Add a cache-busting query so Node evaluates the module fresh even if previously imported
    const fileUrl = pathToFileURL(script).href + `?cachebust=${Date.now()}`

    // Preserve original argv and restore later
    const originalArg1 = process.argv[1]
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    try {
      // Pretend the module was invoked directly
      process.argv[1] = script
      // Dynamic import will evaluate the module and, because argv[1] endsWith('src/index.js'),
      // the top-level branch should call runCli() and thus console.log
      await import(fileUrl)

      expect(logSpy).toHaveBeenCalledWith('Hello, World!')
    } finally {
      // Restore global state
      process.argv[1] = originalArg1
      logSpy.mockRestore()
    }
  })
})
