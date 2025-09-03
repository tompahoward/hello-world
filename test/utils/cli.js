import path from 'path'
import { pathToFileURL } from 'url'

/**
 * Create a fresh dynamic import of a script while temporarily setting process.argv[1]
 * so the imported module sees itself as if it were executed directly.
 *
 * This helper will restore process.argv[1] even if the import throws.
 *
 * @param {string} scriptPath - Path to the script file (relative or absolute)
 * @returns {Promise<Module>} - The imported module namespace object
 */
export async function importFreshAsScript(scriptPath) {
  const resolved = path.resolve(scriptPath)
  const originalArg1 = process.argv[1]

  try {
    // Pretend the module was invoked directly
    process.argv[1] = resolved

    // Import the file:// URL directly so V8 coverage maps to the original file
    const fileUrl = pathToFileURL(resolved).href
    return await import(fileUrl)
  } finally {
    // Always restore global state
    process.argv[1] = originalArg1
  }
}

/**
 * Install a console.log spy using Vitest's `vi` test double.
 *
 * The caller is responsible for restoring the spy (spy.mockRestore()).
 * This helper simply centralizes the creation of the spy so tests remain concise.
 *
 * @param {import('vitest').MockingLibrary} vi - The vitest vi helper (import { vi } from 'vitest')
 * @returns {import('vitest').SpyInstance} - The created spy instance
 */
export function installConsoleLogSpy(vi) {
  return vi.spyOn(console, 'log').mockImplementation(() => {})
}
