// UNIT test: exercises isValidCredentials() completely in isolation.
// No server, no HTTP, no browser - just a function call and an assertion.
const { isValidCredentials } = require('../../src/utils');

test('valid username and a long-enough password returns true', () => {
  expect(isValidCredentials('demo', '1234')).toBe(true);
});

test('missing password returns false', () => {
  expect(isValidCredentials('demo', '')).toBe(false);
});

test('password shorter than 4 characters returns false', () => {
  expect(isValidCredentials('demo', '12')).toBe(false);
});
