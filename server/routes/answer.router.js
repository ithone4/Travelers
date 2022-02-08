const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//GET answers
router.get('/', (req, res) => {
    const getAnswersQuery = `SELECT * FROM answer;`;
    pool.query(getAnswersQuery)
        .then((results) => {
            res.send(results.rows);
        }).catch((error) => {
            console.log(`GET answers error is:`, error);
            res.sendStatus(500);
        })
})

module.exports = router;