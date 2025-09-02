import { describe, it, expect } from 'vitest';
import { spawnSync } from 'child_process';
import path from 'path';
import { pathToFileURL } from 'url';

describe('dynamic import path', () => {
  it('imports the ESM module via file:// and logs Hello, World!', () => {
    const node = process.execPath;
    const script = path.resolve('./src/index.js');
    const fileUrl = pathToFileURL(script).href;

    const code = `import('${fileUrl}').then(m => console.log(m.hello())).catch(err => { console.error(err); process.exit(1); })`;

    const result = spawnSync(node, ['-e', code], { encoding: 'utf8' });

    // Ensure the spawned process exited successfully and printed the expected output
    expect(result.status).toBe(0);
    expect(result.stdout.trim()).toBe('Hello, World!');
  });
});
