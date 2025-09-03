# 0005 — Test consolidation: rationale and verification

Status: Accepted

Summary

This ADR documents the consolidation of several small CLI tests into a focused test layout that
centralizes deterministic helpers and reduces duplication while preserving the previous
coverage and verification semantics.

Context and problem

Originally the repository contained multiple test files that exercised the CLI and module
entrypoints in slightly different ways (direct function invocation, in-process evaluation, and
spawned Node subprocesses). While each path is important to validate, the tests contained a
small amount of duplication and used ad-hoc setup/teardown for top-level ESM evaluation and
console spying. This made the intent less obvious and required repeating the same boilerplate
in multiple places.

Decision

- Consolidate the CLI-related test helpers into a single, well-documented helper module:
  `test/utils/cli.js`.

- Use two helpers to make tests concise and deterministic:
  - `importFreshAsScript(scriptPath)` — dynamically imports an ESM module from a resolved
    path while temporarily setting `process.argv[1]` so the imported module sees itself as if it
    were executed directly. This preserves correct V8 coverage attribution (using `file://`
    imports) and ensures the module's top-level "run-as-script" branch can be exercised.
  - `installConsoleLogSpy(vi)` — installs a `console.log` spy using Vitest's `vi` helper so
    tests can assert that CLI output was produced without printing to the test runner's stdout.

- Keep three verification paths exercised by the test-suite (and retained in the
  consolidated layout):
  1. Unit-level API test that asserts `hello()` returns the expected string.
  2. Spawned subprocess invocation (spawnSync) that runs `node ./src/index.js` to validate the
     script entrypoint prints the expected message when executed directly.
  3. Top-level ESM evaluation via `importFreshAsScript()` to assert the module-level branch that
     calls `runCli()` when executed as a script is exercised and contributes to coverage.

Rationale

- Centralizing the helpers removes repeated boilerplate and makes it explicit how the tests
  exercise the different execution paths without relying on fragile global state manipulations
  scattered across tests.

- Using `file://` dynamic imports (via `pathToFileURL`) maps runtime evaluation back to the
  original source file so V8 coverage correctly attributes hits to `src/index.js` instead of a
  transient eval context.

- Spying on `console.log` keeps tests deterministic and avoids noisy test output while allowing
  assertions on what the CLI printed.

Verification

To verify the consolidation and maintain a green baseline, run the project's standard quality
pipeline locally and in CI:

- Install devDependencies and prepare the project:

  npm install --no-audit --no-fund

- Format the repository (Prettier):

  npm run format

- Run the linter (ESLint):

  npm run lint

- Run the tests and coverage (Vitest + V8):

  npm test

Expected outcome: all checks should pass and coverage should remain high for `src/index.js`.

Consequences

- Tests are easier to maintain and reason about. New tests that need to exercise top-level
  evaluation or CLI behavior should reuse the helpers in `test/utils/cli.js` to remain
  deterministic and coverage-friendly.

- The repository will continue to validate both programmatic and CLI entrypoints without
  duplicating setup code across many test files.

Signed-off-by: Automated update helper
