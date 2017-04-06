// server.js
const express = require('express');
const path = require('path');
const compression = require('compression');
const fs = require('fs');
const basicAuth = require('basic-auth');

const app = express();
app.use(compression());

/*
 * Middleware applied to serve static json files to mock data on prod server.
 * To be removed once we have real API
 */
const mockServer = fs.readdirSync('app/server');
const mockServerRoutes = mockServer.map((resource) => {
  if (resource === '.gitkeep') return null;
  const resourcePath = `/${resource.replace('.js', '')}`;

  return {
    path: resourcePath,
    resource,
  };
}).filter(x => x);

// Auth middleware
const auth = (req, res, next) => {
  // Skip API paths
  if (mockServerRoutes.find(x => req.path.includes(x.path))) return next();

  function unauthorized(response) {
    response.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return response.sendStatus(401);
  }

  const user = basicAuth(req);

  if (!user || !user.name || !user.pass) {
    return unauthorized(res);
  }

  if (user.name === process.env.USER_NAME && user.pass === process.env.PASSWORD) {
    return next();
  }

  return unauthorized(res);
};

// // Authenticate each call
app.use(auth);

// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, 'dist')));

// send all requests to index.html so browserHistory in React Router works
const sendIndex = (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
};

/* eslint-disable */
mockServerRoutes.forEach(x =>
  app.use(x.path, require(`./app/server/${x.resource}`))
);
/* eslint-enable */

app.get('*', sendIndex);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  /* eslint no-console:0 */
  console.log('Production Express server running at localhost: ', PORT);
});
