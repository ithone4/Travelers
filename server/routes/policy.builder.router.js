const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//GET policy choices made by user from policy_builder table -> based on user id
router.get('/:userID', (req, res) => {
    console.log(`in GET of policy builder with req.body = `, req.body);
    console.log(`in GET of policy builder with req.params.id = `, req.params.id);
    const getPolicyBuilderQuery = `SELECT * from policy_builder WHERE user_id = ${req.params.userID};`;
    pool.query(getPolicyBuilderQuery)
        .then((results) => {
            res.send(results.rows);
        }).catch((error) => {
            console.log(`GET policy builder info from policy_builder error is:`, error);
            res.sendStatus(500);
        })
})

//DELETE policy choices
router.delete('/:userID', (req, res) => {
    console.log(`in DELETE of policy builder with req.params.id = `, req.params.id);
    const deletePolicyBuilderQuery = `DELETE from policy_builder WHERE user_id = ${req.params.userID};`;
    pool.query(deletePolicyBuilderQuery)
        .then((results) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log(`DELETE record from policy_builder error is:`, error);
            res.sendStatus(500);
        })
})

// //POST (create) policy choices
router.post('/:userID', (req, res) => {
    console.log(`in POST of policy builder with req.body = `, req.body);

    /*req.body should be an array of objects like:
        req.body = [
        { question: 'choice1', answer: 5 },
        { question: 'choice2', answer: 5 },
        { question: 'choice2', answer: 4 },
        { question: 'choice2', answer: 1 },
        { question: 'choice2', answer: 5 },
        { question: 'choice2', answer: 2 }
        ]
    */

    //We want the INSERT query to be like:
    //INSERT INTO policy_builder (choice1, choice2, choice3, choice4, choice5)
    //VALUES(1, 3, 3, 5, 3);

    //SO...let's build it dynamically based on what is in req.body

    let columnNames = [];
    let columnValues = [];
    //build up the arrays that will be used in the POST query
    request.body.array.forEach(element => {
        columnNames.push(element.question);
        columnValues.push(element.answer);
    });

    let postPolicyBuilderQuery = `INSERT INTO policy_builder (`;

    //add the column names
    columnNames.forEach(columnName => {
        postPolicyBuilderQuery += `${columnName},`
    })
    //get rid of the extra ',' at the end of queryString
    postPolicyBuilderQuery = postPolicyBuilderQuery.slice(0, postPolicyBuilderQuery.length - 1)
    //add the closing bracket for column names and continue on with query string
    postPolicyBuilderQuery = postPolicyBuilderQuery + ') VALUES (';

    //add the column names
    columnNames.forEach(columnValue => {
        postPolicyBuilderQuery += `${columnValue},`
    })
    //get rid of the extra ',' at the end of queryString
    postPolicyBuilderQuery = postPolicyBuilderQuery.slice(0, postPolicyBuilderQuery.length - 1)

    pool.query(postPolicyBuilderQuery)
        .then((results) => {
            res.sendStatus(201);
        }).catch((error) => {
            res.sendStatus(500);
        })
})

// PUT (update record in DB)
router.put('/:userID', (req, res) => {
    console.log(`in PUT of policy builder with req.body = `, req.body);

    //Dynamically get values that will be updated from req.body since we don't know exactly what
    //will be passed.
    let putPolicyBuilderQuery = `UPDATE policy_builder SET `;

    //loop through the object values and corresponding keys by using Object.keys & Object.values functionality
    for (let i = 0; i < Object.keys(req.body).length; i++) {
        let key = Object.keys(req.body)[i];
        let value = Object.values(req.body)[i];
        putPolicyBuilderQuery += `${key} = ${value},`
    }
    //get rid of the extra ',' at the end of queryString
    putPolicyBuilderQuery = putPolicyBuilderQuery.slice(0, putPolicyBuilderQuery.length - 1)
    putPolicyBuilderQuery += ` WHERE id = '${req.params.userID}';`;

    pool.query(putPolicyBuilderQuery).then((results) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    })
})

module.exports = router;