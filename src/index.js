#!/usr/bin/env node

// Minimal ESM module that returns and prints "Hello, World!"
export function hello() {
  return 'Hello, World!';
}

// Export a small entry function so tests can invoke the CLI behavior
export function runCli() {
  // Print the message when invoked
  console.log(hello());
}

if (process.argv[1] && process.argv[1].endsWith('src/index.js')) {
  // When run directly (node ./src/index.js), execute the CLI entrypoint
  runCli();
}
