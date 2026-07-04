module.exports = {
  testEnvironment: 'node',
  // Playwright has its own test runner (`.spec.js` files in tests/e2e) -
  // Jest must ignore that folder or it will try (and fail) to run them too.
  testPathIgnorePatterns: ['/node_modules/', '/tests/e2e/'],
};
