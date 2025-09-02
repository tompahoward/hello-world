# ADR 0001: Documentation and Tooling

Date: 2025-09-02

Status: Accepted

Context

This is a minimal Node.js ESM CLI project that prints a constant string. The repository is intended to be a small, well-structured example demonstrating a Node.js CLI with tests and CI. The project uses ESM, has vitest tests, and includes linting/formatting tooling (ESLint and Prettier). The GitHub Actions CI workflow runs installs, linting, and tests.

Decision

1. Add developer-focused documentation to README.md detailing the exported API, recommended Node version, and local development commands (lint, format, test).
2. Create an ADR directory to record architecture and process decisions; start with this ADR outlining the documentation and tooling choices.
3. Recommend Node >= 18 to match CI.
4. Keep ESLint and Prettier as dev tooling; update and commit their configuration files into the repository.

Rationale

- Small projects benefit from a concise Developer section so contributors can understand the public API (the exported `hello()`), run tests locally, and match CI behavior.
- An ADR captures decisions for future maintainers and avoids repeating the rationale during discussions.
- Aligning the recommended Node version with CI reduces "it works on CI but not locally" issues.
- Keeping lint/format configs in-source ensures consistent style across contributors.

Consequences

- README.md now includes a Developer section and API doc for the exported `hello()` function.
- A `decisions/` directory exists to house ADRs for future decisions.
- Future contributions should reference ADRs when proposing significant changes to tooling or architecture.

Alternatives considered

- Do nothing: rely on the README alone. Rejected because developer-facing details were missing.
- Add extensive external docs/site: rejected due to project size and maintenance overhead.

