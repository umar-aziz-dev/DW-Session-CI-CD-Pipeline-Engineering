const { getGreeting } = require('./index');

test('getGreeting returns the expected welcome message', () => {
  expect(getGreeting()).toBe('Hello from the Multi-Environment Pipeline demo!');
});
