diagnostics/README.md

## Purpose

This directory contains non-production diagnostic artifacts captured during investigation and CI/debugging runs. The files here are intended to help maintainers understand past failures, reproduce troubleshooting steps, and provide an audit trail for supply-chain or CI issues.

## Philosophy

- Keep the main repository focused on source code and small, intentional artifacts.
- Retain diagnostic artifacts only when they provide value for future debugging or historical context.
- Prefer archiving long-lived diagnostic archives outside the main repository (release assets, internal storage) instead of keeping many large logs in-tree.

## Files in this directory

The files currently present (and what they mean):

- npm-audit.json
  - JSON output from `npm audit --json` captured during an inspection run. Keeps a snapshot of known vulnerabilities (if any) at the time of the check.

- npm-ci-inspection.txt
  - Human-readable analysis of an observed `npm ci` failure (for example: ETARGET / No matching version found). Explains root cause and planned next steps.

- npm-ci-log.txt
  - Raw stdout/stderr captured from a failing `npm ci` invocation. Useful when diagnosing registry/lockfile issues.

- npm-install-lock-only.log
  - Output from `npm install --package-lock-only` (attempt to refresh the lockfile without installing packages).

- npm-lint-log.txt
  - Output from running `npm run lint` (ESLint). May contain warnings about configuration migration and any lint errors found at the time.

- npm-lint-staged-versions.json
  - A snapshot of `lint-staged` versions considered during troubleshooting (used to decide a safe pin for reproducible installs).

- npm-test-log.txt
  - Output from running `npm test` (Vitest) including the coverage report captured at the time.

## Retention policy

- Short-term/ephemeral logs (recommended retention: 90 days):
  - npm-ci-log.txt
  - npm-install-lock-only.log
  - npm-lint-log.txt
  - npm-test-log.txt

  These files are most useful while an active investigation is ongoing. If the underlying issue is resolved, prune these files in a single cleanup commit.

- Long-term/reference logs (keep unless superseded):
  - npm-audit.json
  - npm-lint-staged-versions.json
  - npm-ci-inspection.txt

  These capture decisions and supply-chain evidence that may be useful later for audits or for understanding why a particular workaround/pin was introduced.

## Rules for pruning

- If a log is older than 90 days and is not referenced by an open issue, pull request, or ADR, it should be removed from the repository.
- To remove one or more files, create a single tidy commit that removes them (git rm diagnostics/<file>; git commit -m "chore: prune ephemeral diagnostics logs").
- If you need to retain an old log for audit purposes, consider moving it to a release asset or an external archive (S3, internal artifact store) and remove it from the repository.

## How to regenerate these artifacts

Run the following commands from the repository root (non-interactive). Each command overwrites the corresponding file with fresh output.

- npm audit (JSON)
  - npm audit --json > diagnostics/npm-audit.json 2>&1

- npm install --package-lock-only (try to refresh lockfile metadata)
  - npm install --package-lock-only --no-audit --no-fund > diagnostics/npm-install-lock-only.log 2>&1

- npm ci (capture CI install output)
  - npm ci > diagnostics/npm-ci-log.txt 2>&1

- lint (ESLint)
  - npm run lint > diagnostics/npm-lint-log.txt 2>&1

- format (Prettier - capture output if you want)
  - npm run format --silent > diagnostics/npm-format.log 2>&1

- tests (Vitest)
  - npm test -- --run > diagnostics/npm-test-log.txt 2>&1

- capture lint-staged version decisions
  - npm view lint-staged versions --json > diagnostics/npm-lint-staged-versions.json 2>&1

When regenerating logs, review them and commit any that are useful to retain. Avoid committing large or noisy logs unless they are required for future troubleshooting.

## Good practices

- Keep diagnostic commits small and well-described (why the artifacts were added, and the retention rationale).
- Prefer documenting the high-level cause in an ADR (decisions/) if the diagnostic led to a lasting change (for example, pinning a dependency or changing CI behavior).
- If you discover a security-related supply-chain issue, escalate according to your security policy and keep only the minimal artifacts required for an audit.

## Contact

If you have questions about these diagnostics, file an issue or reach out to the repository maintainers. Include a reference to the files in this directory when reporting related CI or dependency problems.
