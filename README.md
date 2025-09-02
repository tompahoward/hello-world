# Hello World

A minimal Node.js ESM CLI that prints "Hello, World!" and exposes a hello() function for use as a module.

## Installation

```bash
npm ci
```

## Usage

Run the CLI:

```bash
npm start
```

Or import the function in your code:

```js
import { hello } from './src/index.js';
console.log(hello()); // 'Hello, World!'
```

## Developer

Recommended Node.js version: >= 18

Quality checks:

- Lint: `npm run lint`
- Format: `npm run format`
- Tests: `npm test`


## License

MIT
