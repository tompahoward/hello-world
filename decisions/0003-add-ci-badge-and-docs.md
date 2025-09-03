# 0003 - Add CI badge and docs

Status: Accepted

This ADR records a small documentation change to add a GitHub Actions CI status badge to README.md and to document the recommended Node.js version in package.json via an `engines` field.

Rationale

- A CI badge improves visibility of project health for contributors and automated systems.
- Explicitly documenting the Node version in `package.json` (`engines.node`) helps communicate runtime requirements and reduces confusion for developers using older Node versions. CI uses Node 18, so `>=18` is sufficient.

Decision

- Add a CI badge to README.md referencing .github/workflows/ci.yml. A placeholder URL will be used if necessary and updated after the PR merges.
- Add `"engines": { "node": ">=18" }` to package.json as a documentation-only change.

Consequences

- No functional changes to production code.
- README.md and package.json will reflect the documented Node requirement and project CI status.
