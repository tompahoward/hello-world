#!/usr/bin/env node

// Minimal ESM module that returns and prints "Hello, World!"
export function hello() {
  return 'Hello, World!';
}

if (process.argv[1] && process.argv[1].endsWith('src/index.js')) {
  // When run directly (node ./src/index.js), print the message
  console.log(hello());
}
