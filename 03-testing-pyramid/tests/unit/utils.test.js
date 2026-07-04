// UNIT test: exercises isValidCredentials() completely in isolation.
// No server, no HTTP, no browser - just a function call and an assertion.
const { isValidCredentials } = require('../../src/utils');


const calculateGST = (amount) => {
  const gstRate = 0.18; // 18% GST rate
  return amount * gstRate;
};


test('valid username and a long-enough password returns true', () => {
  expect(isValidCredentials('demo', '1234')).toBe(true);
});

test('missing password returns false', () => {
  expect(isValidCredentials('demo', '')).toBe(false);
});

test('password shorter than 4 characters returns false', () => {
  expect(isValidCredentials('demo', '12')).toBe(false);
});

// Extra test to demonstrate a failing test case
test('calculateGST returns correct GST amount', () => {
  const amount = 1000;
  const expectedGST = 180; // 18% of 1000
  expect(calculateGST(amount)).toBe(expectedGST);
});
