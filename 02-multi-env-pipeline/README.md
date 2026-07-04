# 02 - Multi-Environment Pipeline

A bigger pipeline: a matrix build followed by three sequential deploy jobs,
each tied to its own GitHub Environment (`dev`, `staging`, `production`).
Production is wired up to require manual approval.

Use this demo during the **GitHub Actions** section of the talk, right after
demo 1.

## What's in here

- `index.js` / `index.test.js` - the same shape of tiny Express app + Jest
  test as demo 1, just a different greeting.
- `package.json` - `start`, `test`, `build` scripts.

The matching workflow lives at
[`.github/workflows/02-multi-env-pipeline.yml`](../.github/workflows/02-multi-env-pipeline.yml).

## Pipeline flow

```
                ┌───────────────────────┐
                │        build           │
                │  matrix: node 18 & 20  │
                │  install → test → build│
                └───────────┬────────────┘
                             │ needs
                             ▼
                ┌───────────────────────┐
                │      deploy-dev        │
                │ environment: dev       │
                │ auto, no approval      │
                └───────────┬────────────┘
                             │ needs
                             ▼
                ┌───────────────────────┐
                │    deploy-staging      │
                │ environment: staging   │
                │ auto, no approval      │
                └───────────┬────────────┘
                             │ needs
                             ▼
                ┌───────────────────────┐
                │   deploy-production    │
                │ environment: production│
                │ ⏸ waits for a human    │
                │   reviewer to approve  │
                └────────────────────────┘
```

## One-time setup in the GitHub UI

The workflow file references three environments by name, but the actual
*protection rules* (like "require a reviewer") have to be configured on
GitHub itself:

1. Go to the repo → **Settings → Environments**.
2. Create three environments: `dev`, `staging`, `production` (names must
   match the `environment:` values in the workflow exactly).
3. Optionally add an `API_URL` secret to each one (Settings → Environments →
   pick one → Add secret). It doesn't need a real value for this demo.
4. On `production`, add a **Required reviewers** protection rule and add
   yourself (or a colleague) as a reviewer.

## Run it locally

```bash
cd 02-multi-env-pipeline
npm install
npm test
npm run build
npm start   # http://localhost:3000
```

## What to show during the demo

1. Open the workflow file and walk through the 4 jobs top to bottom, reading
   the comments: `build` (matrix) → `deploy-dev` → `deploy-staging` →
   `deploy-production`.
2. Point out `needs:` on each deploy job - that's what forces them to run in
   order instead of all at once.
3. Point out `environment:` on each deploy job, and show the Environments
   page in Settings so the mapping is visible.
4. Push a change and open the **Actions** tab. Show the matrix build running
   two parallel sub-jobs (Node 18 and Node 20), then dev and staging
   deploying automatically.
5. Show `deploy-production` sitting in a **"Waiting"** state, then approve it
   live as the reviewer to demonstrate the manual gate.

## Bridging to real deployment strategies

This demo only *echoes* a deploy message - there's no real infrastructure
behind it. But the pattern (environments + required approvals + ordered
jobs) is exactly what real teams use to control **when and how** a rollout
happens. What actually *executes* the rollout in production usually comes
from a cloud provider or an orchestrator like Kubernetes, using one of these
strategies:

| Strategy   | Idea                                                | Where GitHub Environments fit in                                  |
|------------|------------------------------------------------------|---------------------------------------------------------------------|
| Rolling    | Replace old instances with new ones gradually         | The `deploy-production` job would call `kubectl rollout` or similar |
| Blue-Green | Run two full environments, switch traffic when ready  | The `production` environment's approval gate is the "switch" moment |
| Canary     | Send a small % of traffic to the new version first     | A `deploy-canary` job (with its own environment) could sit before `deploy-production` |

So: **this repo demonstrates the control plane** (who/what approves a
release and in what order), while **Kubernetes / your cloud provider is the
execution plane** (how traffic is actually shifted). That's a natural place
to pivot the talk toward whichever infra layer you cover next.
