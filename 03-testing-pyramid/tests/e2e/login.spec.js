// E2E test: drives a real browser through the full user flow -
// load the page, fill the form, submit, and check what the user actually sees.
const { test, expect } = require('@playwright/test');

test('user can log in through the login form', async ({ page }) => {
  await page.goto('/');

  await page.fill('#username', 'demo-user');
  await page.fill('#password', 'demo-pass');
  await page.click('button[type="submit"]');

  await expect(page.locator('#result')).toHaveText('Welcome, demo-user!');
});

test('shows an error message for an invalid password', async ({ page }) => {
  await page.goto('/');

  await page.fill('#username', 'demo-user');
  await page.fill('#password', '1');
  await page.click('button[type="submit"]');

  await expect(page.locator('#result')).toHaveText('Invalid username or password');
});
