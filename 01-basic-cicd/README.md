# 01 - Basic CI Pipeline

The simplest possible CI pipeline. One tiny Express app, one Jest test, one
GitHub Actions job with no matrix, no environments, and no secrets.

Use this demo right after explaining the core vocabulary: **triggers, jobs,
steps, runners**.

## What's in here

- `index.js` - an Express app with a single `GET /` route, and a small
  `getGreeting()` function the route calls.
- `index.test.js` - one Jest unit test for `getGreeting()`.
- `package.json` - scripts for `start`, `test`, and `build` (build is just an
  `echo`, there's nothing to compile in this demo).

The matching workflow lives at
[`.github/workflows/01-Stage-wise.yml`](../.github/workflows/01-Stage-wise.yml).

## Run it locally

```bash
cd 01-Stage-wise
npm install
npm test        # runs the Jest unit test
npm run build    # no-op, just echoes a message
npm start        # starts the server on http://localhost:3000
```

Visit `http://localhost:3000` in a browser or run `curl localhost:3000` to
see the greeting.

## What to show during the demo

1. Open `index.js` and `index.test.js` side by side - point out the app is
   two lines of real logic, on purpose.
2. Open `.github/workflows/01-Stage-wise.yml` and read the comments aloud:
   - `on:` → when the pipeline runs (push to `main`, or any pull request).
   - `jobs:` → one job, `build-and-test`.
   - `runs-on:` → the disposable Ubuntu VM ("runner") that does the work.
   - `steps:` → checkout → setup-node → install → test → build, in order.
3. Push a small change (or open a pull request) and switch to the **Actions**
   tab on GitHub. Show the job running live, each step expanding with logs.
4. Break it on purpose: change the expected string in `index.test.js`, push,
   and show the red ❌ job and the failing step's log output. Then revert.

This is the pipeline every other demo in this repo builds on top of.
