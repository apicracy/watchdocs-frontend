// server.js
const express = require('express');
const path = require('path');
const compression = require('compression');

const app = express();
app.use(compression());

// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, 'dist')));

// send all requests to index.html so browserHistory in React Router works
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  /* eslint no-console:0 */
  console.log('Production Express server running at localhost: ', PORT);
});