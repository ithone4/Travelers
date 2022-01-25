const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//GET policy text
router.get('/', (req, res) => {
    const policyTextQuery = `SELECT * FROM policy_text;`;
    pool.query(policyTextQuery)
        .then((results) => {
            res.send(results.rows);
        }).catch((error) => {
            console.log(`GET policy_text error is:`, console.log());
            res.sendStatus(500);
        })
})

