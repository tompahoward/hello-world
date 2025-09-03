# 0004 — DevDependencies update: selection for next batch

Status: proposed

Summary

I inspected the machine-readable outdated report at /tmp/npm-outdated.json to determine a safe, small set of devDependency updates to apply next (prioritizing vitest + @vitest/coverage-v8, then eslint). The intention was to perform incremental, low-risk patch/minor updates and run the full quality pipeline after each group.

Findings

- /tmp/npm-outdated.json only reported an outdated entry for `prettier` (installed/current: 2.8.8, latest: 3.6.2). The project `package.json` already contains `prettier` at `^3.6.2`, so no action is required for Prettier in this branch.
- I queried npm for the latest versions of the prioritized packages and found:
  - vitest: 3.2.4 (matches package.json)
  - @vitest/coverage-v8: 3.2.4 (matches package.json)
  - eslint: 9.34.0 (matches package.json)

Decision

No devDependency updates will be performed in this immediate batch because the prioritized packages (vitest, @vitest/coverage-v8, eslint) are already at the desired patch/minor versions according to npm. Prettier has already been updated in package.json previously, so it is also skipped.

Next steps

- If desired, we can run `npm audit` and/or `npm outdated` again to detect any new patch/minor updates before opening a PR.
- When updates are available, follow the incremental plan: update one small logical group at a time (e.g., vitest + @vitest/coverage-v8), run `npm ci`, `npm run lint`, `npm run format`, and `npm test`, and revert if anything regresses.
- Optionally enable Dependabot/Renovate (devDependencies-only, conservative rules) in a follow-up PR to automate patch/minor updates.

Rationale

This keeps changes small and easily reversible while preserving the current green test/lint pipeline. It avoids churn by not applying unnecessary updates when the package.json already reflects the desired versions.

Signed-off-by: Automated update helper
