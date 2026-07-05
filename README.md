# CI/CD Pipeline Engineering - Demos

This repo holds the live-demo material for the "CI/CD Pipeline Engineering"
mentoring session. Each demo is a small, self-contained folder with its own
Node.js/Express app, its own `package.json`, and its own GitHub Actions
workflow in [`.github/workflows/`](.github/workflows/).

## Demos, in the order to show them

| # | Folder | Show it during... | What it demonstrates |
|---|--------|--------------------|------------------------|
| 1 | [`01-Stage-wise/`](01-Stage-wise/) | Right after explaining triggers/jobs/steps/runners | The simplest possible CI pipeline: one job, checkout → install → test → build |
| 2 | [`02-multi-env-pipeline/`](02-multi-env-pipeline/) | GitHub Actions section | Matrix builds, `needs:` job chaining, and 3 GitHub Environments (dev → staging → production, with a manual approval gate on production) |
| 3 | [`03-testing-pyramid/`](03-testing-pyramid/) | Testing Stages section | The testing pyramid as 3 gated CI jobs: unit (Jest) → integration (Supertest) → e2e (Playwright) |

Each folder has its own README with exact local run commands and a
"what to show during the demo" walkthrough.

## Earlier experiment

[`Stage-wise/`](Stage-wise/) is an earlier static-site CI/CD experiment
(HTML/CSS + Docker + Render deploy hooks, workflows named
`Stage-wise-*.yml`). It's kept as-is and is unrelated to the three
Node/Express demos above.
