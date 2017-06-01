/**
 * Register your development apis as router middlewars
 */
const express = require('express');
const fs = require('fs');

const router = express.Router();

router.get('/', (req, res) => {
  fs.readFile('app/data/projects.json', (err, data) => {
    if (err) res.send(err);
    else res.send(JSON.parse(data));
  });
});

module.exports = router;
