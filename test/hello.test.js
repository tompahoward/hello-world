import { describe, it, expect } from 'vitest';
import { hello } from '../src/index.js';
import { spawnSync } from 'child_process';
import path from 'path';

describe('hello', () => {
  it('returns the expected string', () => {
    expect(hello()).toBe('Hello, World!');
  });

  it('prints the message when run as a script', () => {
    const node = process.execPath;
    const script = path.resolve('./src/index.js');
    const result = spawnSync(node, [script], { encoding: 'utf8' });
    expect(result.stdout.trim()).toBe('Hello, World!');
  });
});
