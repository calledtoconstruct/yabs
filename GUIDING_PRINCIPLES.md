# Guiding principles: calledtoconstruct/yabs

## Purpose and scope
Yet Another Blog Site: a self-hosted blog using Firebase authentication, Firestore and an Angular client.

## Stack and layout
Angular 12 / TypeScript 4.3 (strict), Angular Material, Firebase. Feature areas under `src/app/` (check, document, edit, read and others), Karma + Jasmine specs next to each component (`*.spec.ts`). ESLint config `.eslintrc.js`.

## Commands
| Check | Command | Evidence |
|---|---|---|
| Setup | `npm install` | README.md |
| Build | `npx ng build` | README.md |
| Type-check | Covered by `npx ng build` (strict tsconfig) | tsconfig.json |
| Lint | `npx eslint <changed files>` using `.eslintrc.js` (no npm script) | .eslintrc.js |
| Changed-feature tests | `npx ng test --no-watch --include <path to changed spec or folder>` | README.md, karma.conf.js |
| Full suite | `npx ng test --no-watch` runs in the 'Execute Unit Tests' workflow on push to master | test-production.yml |
| CI | Unit tests and two Firebase deploys run on push to master; CodeQL runs on PRs. PRs do not run the unit tests | ./.github/workflows/ |

Commands marked as not written down come from the build files, not from project docs; confirm them before relying on them.

## Before every push
Before every push: run the build and type-check/lint that exist here, plus only the tests for the files or feature you changed (team rule, ideas #14 note 6797). Do not run the full suite locally as a routine gate; the full suite belongs in CI. Merge needs a positive review and green CI. Explain any new failure your change caused. Never weaken a valid test to make it pass, and never invent a command this file does not list.

## Project rules
- Follow ESLint: 2-space indent, single quotes, semicolons, sorted imports, unused vars prefixed `_`.
- Keep each feature in its own folder with its spec beside the component.
- Never commit Firebase service-account secrets; deploys use repository secrets.

## What to avoid
- Committing to the default branch; work on a branch and open a pull request.
- Deleting files, branches or history, or changing repository settings.
- Adding tooling, CI or dependencies that the change does not need.
- Rules copied from other projects (file-size limits, clocks, quotas) that this repository never adopted.

## Delivery and safety
- Every merge to master deploys live to yet-another-blog-site.web.app and ember-yabs.web.app. Treat merges as releases.

## Open questions
- Unit tests only run after merge (push to master), not on PRs; report this gap.

## Sources
Read from the `master` branch on 2026-11-08 ET: `README.md`, `package.json`, `.eslintrc.js`, `.github/workflows/`.

## Instruction updates
Check `guiding-principles.version` at the start of each turn and when you enter this project; reload this file when the version changes. Change this file, its version and date, and `PRINCIPLES_HISTORY.md` in the same commit. Team-wide role instructions are versioned separately in the team-process repository.
