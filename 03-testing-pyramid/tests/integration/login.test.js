// INTEGRATION test: exercises the Express app and its routing/middleware
// together via Supertest, but still with no real network socket or browser.
const request = require('supertest');
const app = require('../../src/app');

describe('POST /login', () => {
  test('returns 200 and a success message for valid credentials', async () => {
    const res = await request(app).post('/login').send({ username: 'demo', password: '1234' });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ success: true, message: 'Welcome, demo!' });
  });

  test('returns 401 for invalid credentials', async () => {
    const res = await request(app).post('/login').send({ username: 'demo', password: '1' });

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });
});
