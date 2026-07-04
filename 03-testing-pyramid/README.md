# 03 - Testing Pyramid

The **testing pyramid** is a way of thinking about how many tests of each
kind you should write. At the base you have many fast, cheap **unit tests**.
In the middle you have fewer, slightly slower **integration tests**. At the
top you have very few, slow, expensive **end-to-end (E2E) tests** that drive
the whole system like a real user would. This demo maps each layer onto its
own CI job, chained with `needs:` so that a failure at one layer stops the
more expensive layers from ever running.

Use this demo during the **Testing Stages** section of the talk.

## What's in here

- `src/utils.js` - a plain function, `isValidCredentials()`, with no
  framework or network dependency.
- `src/app.js` - an Express app exposing `POST /login`, which uses
  `isValidCredentials()`.
- `src/public/index.html` - a minimal login form that calls `/login` via
  `fetch()` and shows the response message on the page.
- `src/server.js` - starts the app listening on a port (used for local runs
  and by Playwright for E2E tests).
- `tests/unit/utils.test.js` - Jest, tests `isValidCredentials()` directly.
- `tests/integration/login.test.js` - Supertest, tests the `/login` endpoint
  (status code + response shape) without a browser.
- `tests/e2e/login.spec.js` - Playwright, drives a real browser through the
  login form on the actual page.

The matching workflow lives at
[`.github/workflows/03-testing-pyramid.yml`](../.github/workflows/03-testing-pyramid.yml).

## The pyramid at a glance

| Layer       | Tool       | What it tests                         | Speed      | How many should you have? |
|-------------|------------|----------------------------------------|------------|----------------------------|
| Unit        | Jest       | One function, in isolation             | Fastest    | Lots                       |
| Integration | Supertest  | A route + the code it calls together   | Medium     | Some                       |
| E2E         | Playwright | The full flow, through a real browser  | Slowest    | Few                        |

## Run it locally

```bash
cd 03-testing-pyramid
npm install
npx playwright install --with-deps chromium   # one-time, needed for E2E only

npm run test:unit          # layer 1
npm run test:integration    # layer 2
npm run test:e2e            # layer 3 (starts the server itself)

npm start                   # run the app manually at http://localhost:3000
```

## What to show during the demo

1. Open the three test files side by side and point out the increasing
   amount of machinery each one needs: `utils.test.js` needs nothing,
   `login.test.js` needs Supertest + the Express app, `login.spec.js` needs
   a real browser.
2. Open the workflow file and read the three jobs aloud: `unit-tests` →
   `integration-tests` → `e2e-tests`, each one gated by `needs:` on the
   previous job.
3. Push a change and open the **Actions** tab - show the jobs lighting up
   one at a time, left to right.
4. Break it on purpose: put a bug in `src/utils.js` (e.g. always `return
   false`), push, and show that `unit-tests` fails red and
   `integration-tests`/`e2e-tests` are skipped entirely - the pyramid is
   protecting you from wasting time on slow tests when the cheap ones
   already caught the problem. Then revert.
