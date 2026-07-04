const express = require('express');

function getGreeting() {
  return 'Hello from the Multi-Environment Pipeline demo!';
}

const app = express();

app.get('/', (req, res) => {
  res.send(getGreeting());
});

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`02-multi-env-pipeline app listening on port ${PORT}`);
  });
}

module.exports = { app, getGreeting };
