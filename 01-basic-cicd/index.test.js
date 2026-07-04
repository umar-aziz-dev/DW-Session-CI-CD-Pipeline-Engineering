const { getGreeting } = require('./index');

test('getGreeting returns the expected welcome message', () => {
  expect(getGreeting()).toBe('Hello from the Basic CI/CD demo!');
});
