const express = require('express');
const path = require('path');
const { isValidCredentials } = require('./utils');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// The endpoint an INTEGRATION test exercises directly (no browser involved).
app.post('/login', (req, res) => {
  const { username, password } = req.body || {};

  if (isValidCredentials(username, password)) {
    return res.status(200).json({ success: true, message: `Welcome, ${username}!` });
  }

  return res.status(401).json({ success: false, message: 'Invalid username or password' });
});

module.exports = app;
