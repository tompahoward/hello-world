# Hello World

[![CI](https://github.com/<owner>/<repo>/actions/workflows/ci.yml/badge.svg)](https://github.com/<owner>/<repo>/actions/workflows/ci.yml)

A minimal Node.js ESM CLI that prints "Hello, World!" and exposes two functions for use as a module: `hello()` and `runCli()`.

## Installation

```bash
npm ci
```

## Usage

Run the CLI:

```bash
npm start
```

Or import the functions in your code:

```js
import { hello, runCli } from './src/index.js';

console.log(hello()); // 'Hello, World!'

// invoke the CLI behavior programmatically
runCli(); // prints 'Hello, World!' to stdout
```

## Exported API

- `hello()` — returns the string "Hello, World!".
- `runCli()` — performs the top-level CLI behavior (prints the message to stdout). This is exported so tests or other code can invoke the CLI behavior without spawning a separate process.

### CLI entrypoint

The source file (`src/index.js`) contains a shebang (`#!/usr/bin/env node`) so it can be executed as a script. When the module is evaluated as a top-level script (for example with `node ./src/index.js` or via `npm start`) the module detects this and calls `runCli()` automatically:

```js
if (process.argv[1] && process.argv[1].endsWith('src/index.js')) {
  runCli();
}
```

If you import the module normally, `runCli()` will not run automatically — you can call it directly if you want the CLI behavior in-process.

## Developer

Recommended Node.js version: >= 18

Quality checks:

- Lint: `npm run lint`
- Format: `npm run format`
- Tests (with coverage): `npm test`

Coverage output

Running `npm test` (Vitest with V8 coverage) will write coverage reports to the `coverage/` directory. An HTML report is available under `coverage/lcov-report/index.html` after the tests complete.

## License

MIT
