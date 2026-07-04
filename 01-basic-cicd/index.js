const express = require('express');

// A tiny pure function so we have something obvious to unit test.
function getGreeting() {
  return 'Hello from the Basic CI/CD demo!';
}

const app = express();

app.get('/', (req, res) => {
  res.send(getGreeting());
});

// Only start listening when this file is run directly (e.g. `npm start`),
// not when it's required by the test file - that keeps the test fast and port-free.
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`01-basic-cicd app listening on port ${PORT}`);
  });
}

module.exports = { app, getGreeting };
