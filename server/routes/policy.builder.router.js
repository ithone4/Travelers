const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//GET policy choices from policy_builder table -> based on user id
router.get('/:userID', (req, res) => {
    const getPolicyBuilderQuery = `SELECT * from policy_builder WHERE user_id = ${req.params.userID};`;
    pool.query(getPolicyBuilderQuery)
        .then((results) => {
            res.send(results.rows);
        }).catch((error) => {
            console.log(`GET policy builder info from policy_builder error is:`, error);
            res.sendStatus(500);
        })
})