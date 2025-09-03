# API

This document describes the public API exported by this package and shows short usage examples.

## Exports

- `hello()` — returns the string "Hello, World!".
- `runCli()` — performs the CLI behavior (prints the message to stdout). Exported so tests or other code can invoke the CLI entrypoint without spawning a subprocess.

## Examples

### 1) Import and call hello()

```js
import { hello } from './src/index.js';

console.log(hello()); // -> 'Hello, World!'
```

### 2) Invoke runCli() programmatically (in-process)

When writing tests or embedding the CLI behavior inside another program, call `runCli()` directly. This prints the message to stdout but does not spawn a new Node process.

```js
import { runCli } from './src/index.js';

// prints 'Hello, World!' to stdout
runCli();
```

### 3) Run the CLI as a script (shell)

Use the `start` npm script or execute the source file with Node. The module contains a top-level check so calling it as a script will execute the CLI automatically.

```bash
npm start
# or
node ./src/index.js
```

The top-level entrypoint logic in `src/index.js` looks like this:

```js
if (process.argv[1] && process.argv[1].endsWith('src/index.js')) {
  runCli();
}
```

This ensures normal imports do not execute the CLI automatically; call `runCli()` explicitly when in-process behavior is desired.

## Environment variables (.env)

This project includes an optional `.env` file (it is git-ignored) for when the project is extended to call external services. The minimal CLI and the default tests do not require any environment variables. If you do add or enable external integrations, the following variables may be used:

- `OPENAI_API_KEY` — optional. API key used to authenticate requests to the OpenAI API.
- `OPENAI_MODEL` — optional. The default model identifier to use when making requests to OpenAI (e.g., `gpt-4o-mini`); only relevant when OpenAI calls are enabled.
- `VODER_AGENTIC_MODE` — optional. A flag (e.g., `true`/`false`) to toggle more agentic or advanced behavior when agentic features are implemented.

Note: `.env` is intentionally git-ignored to avoid committing secrets. For the current, minimal Hello World CLI these variables are not required; they are documented here for clarity in case you extend the project later to call external APIs.
