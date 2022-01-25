const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//GET questions
router.get('/', (req, res) => {
    const getQuestionsQuery = `SELECT * from question;`;
    pool.query(getQuestionsQuery)
        .then((results) => {
            res.send(results.rows)
        }).catch((error) => {
            console.log(`GET questions error is:`, error);
            res.sendStatus(500);
        })
});