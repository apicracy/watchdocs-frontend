/**
 * Register your development apis as router middlewars
 */
const express = require('express');
const fs = require('fs');

const router = express.Router();

router.get('/:id', (req, res) => {
  fs.readFile(`app/data/endpoints/${req.params.id}.json`, (err, data) => {
    if (err) res.status(404).send({ response: 'Not found' });
    else res.send(JSON.parse(data));
  });
});

module.exports = router;
