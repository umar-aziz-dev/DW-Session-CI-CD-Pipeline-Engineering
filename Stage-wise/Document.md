# CI/CD Demo with Stage-wise

This project is a good example for a beginner-friendly session because it is simple, visual, and easy to explain.

It contains:
- a static website with HTML and CSS
- a Dockerfile for containerizing the app
- GitHub Actions workflows for CI and CD located in the repository root under .github/workflows/

> Note: the app content lives inside the Stage-wise folder, while the CI/CD workflow files now live in the outer Ci-CD repository folder.


## 1. CI vs CD vs Continuous Delivery vs Continuous Deployment

### Continuous Integration (CI)
CI means every change is automatically checked before it is merged.

Typical CI steps:
- checkout the code
- install dependencies
- run linting
- run tests
- build the application
- build a Docker image

In this repo, the CI workflow checks the HTML/CSS and builds a Docker image.

### Continuous Delivery (CD)
Continuous Delivery means code is always prepared to be released, but a human may decide when to deploy.

Example:
- code passes CI
- artifact is ready
- a team lead clicks “deploy”

### Continuous Deployment
Continuous Deployment means every validated change is deployed automatically.

Example:
- code passes CI
- deploy happens automatically
- no manual approval is needed

### Simple summary
- CI = validate code
- CD = prepare and release code
- Continuous Delivery = release when approved
- Continuous Deployment = release automatically

---

## 2. What the current project demonstrates

### CI workflow
The workflow in .github/workflows/Stage-wise-ci-dev.yml (at the repository root) shows a basic CI example:
1. Trigger on pull request to development
2. Checkout the repository
3. Install linting tools
4. Lint HTML and CSS
5. Build a Docker image
6. Push the image to Docker Hub

### CD workflow
The workflow in .github/workflows/Stage-wise-cd-dev.yml (at the repository root) shows a basic deployment example:
1. Trigger on push to development
2. Checkout the repository
3. Trigger a deployment hook
4. Deploy the app

This is a clean beginner example because it shows the core idea without too much complexity.

---

## 3. GitHub Actions basics

GitHub Actions is the automation engine used in this project.

### Key concepts
- on: defines when the workflow runs
- jobs: separate tasks in the workflow
- steps: individual actions inside a job
- runs-on: the machine that executes the job
- uses: reuses community actions
- run: executes shell commands

### Example from this repo
```yaml
on:
  pull_request:
    branches:
      - development
```
This means the workflow runs when a pull request is created or updated for the development branch.

Another example:
```yaml
jobs:
  build-and-test:
    runs-on: ubuntu-latest
```
This creates a job called build-and-test that runs on a GitHub-hosted Ubuntu machine.

---

## 4. Testing stages in a pipeline

A good pipeline usually has multiple testing levels.

### 1. Unit tests
Test small pieces of logic in isolation.
Example:
- function returns expected value
- validation logic works correctly

### 2. Integration tests
Test how multiple parts work together.
Example:
- API connects to database
- frontend calls backend successfully

### 3. End-to-End (E2E) tests
Test the full user flow.
Example:
- user logs in
- user adds an item to cart
- user completes checkout

For this simple static site, you can show the first layer as linting and build validation, and then explain how real applications add unit, integration, and E2E tests later.

---

## 5. Secrets management in pipelines

Secrets are sensitive values such as:
- Docker Hub usernames and tokens
- cloud API keys
- deployment hook URLs
- database credentials

Do not hardcode secrets into the workflow file.

### Best practice
Store them in GitHub Secrets:
- Go to repository Settings
- Open Secrets and variables -> Actions
- Add secrets such as:
  - DOCKERHUB_USERNAME
  - DOCKERHUB_TOKEN
  - RENDER_DEPLOY_HOOK_DEV_URL

### Example
```yaml
with:
  username: ${{ secrets.DOCKERHUB_USERNAME }}
  password: ${{ secrets.DOCKERHUB_TOKEN }}
```

This is a very important topic for attendees because secrets are often misunderstood in beginner workshops.

---

## 6. Deployment strategies

There are several common deployment strategies.

### Rolling deployment
The new version replaces old instances gradually.

Advantages:
- simple
- low risk

Disadvantages:
- some users may see older version while rollout is happening

### Blue-Green deployment
Two environments exist at the same time:
- blue = current version
- green = new version

Traffic is switched to green once it is ready.

Advantages:
- fast rollback
- less downtime

### Canary deployment
A small percentage of users receive the new version first.

Advantages:
- safer rollout
- good for testing real traffic

Disadvantages:
- more complex setup

### How to explain this in a session
You can say:
- Rolling = update gradually
- Blue-Green = switch traffic between two full environments
- Canary = release to a small group first

---

## 7. How to present this demo live

A simple flow for your session:

1. Show the project structure
2. Explain what the website is
3. Show the CI workflow and explain each step
4. Show the CD workflow and explain deployment
5. Explain CI vs CD with a simple real-world analogy
6. Add a short note on testing stages
7. Show how secrets are stored safely
8. End with deployment strategies

### Simple analogy
- CI is like a quality check before a product is sent forward
- CD is like sending the product to the next stage automatically
- Delivery is like preparing the product for release
- Deployment is like actually shipping it to users

---

## 8. Suggested talking points for beginners

Keep the explanation simple:
- “CI catches problems early.”
- “CD automates the release workflow.”
- “Secrets should never be stored in code.”
- “Every pipeline should test before deployment.”
- “Different deployment strategies are used for different risk levels.”

---

## 9. Final takeaway

This repo is a good starting point because it shows:
- a classic CI pipeline
- a simple deployment pipeline
- the use of Docker
- GitHub Actions basics
- the importance of secrets

It is beginner-friendly, practical, and easy to demonstrate live.
