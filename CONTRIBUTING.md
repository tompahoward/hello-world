# Contributing

Thank you for considering contributing to this project! The project is intentionally small and designed to be easy to read and modify. Please follow these guidelines to make contributions smooth for maintainers.

Getting started

1. Clone the repository and install dependencies:

```bash
git clone <repo-url>
cd <repo-directory>
npm ci
```

2. Run the quality checks locally:

- Lint: `npm run lint` (ESLint)
- Format: `npm run format` (Prettier)
- Tests: `npm test` (Vitest)

Development workflow

- Create a feature branch from main for your changes.
- Make small, incremental commits with clear messages.
- Ensure tests pass and linting is clean before opening a PR.

Commit message guidance

- Use clear, imperative messages. Examples:
  - `feat: add new behavior`
  - `fix: correct typo`
  - `docs: update README`
  - `chore: update dev dependencies`

Pull requests

- Describe the intent of the change and any relevant context.
- Reference any related issue if applicable.
- Keep changes focused and small when possible.

Style and testing

- Add tests for any behavior you add or modify.
- Keep code simple and readable. Prefer small functions and clear names.
- Run the formatting and linting commands before committing.

Thank you for your contribution!