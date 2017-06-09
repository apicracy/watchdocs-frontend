// server.js
const express = require('express');
const path = require('path');
const compression = require('compression');
const fs = require('fs');

const env = process.env.NODE_ENV || 'development';

const app = express();
app.use(compression());

// const forceSsl = (req, res, next) => {
//   if (req.headers['x-forwarded-proto'] !== 'https') {
//     return res.redirect(301, ['https://', req.get('Host'), req.url].join(''));
//   }
//   return next();
// };

// if (env === 'production') {
//   app.use(forceSsl);
// }

// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, 'dist')));

// send all requests to index.html so browserHistory in React Router works
const sendIndex = (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
};

/* eslint-enable */

app.get('*', sendIndex);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  /* eslint no-console:0 */
  console.log('Production Express server running at localhost: ', PORT);
});
