const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route to get all info snippets
 */
router.get('/', (req, res) => {
   const query = 
   `SELECT * FROM info_snippet;`;
   pool.query(query)
     .then( result => {
       res.send(result.rows);
     })
     .catch(err => {
       console.log('ERROR: Get info snippet', err);
       res.sendStatus(500)
     })
 
 });

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
