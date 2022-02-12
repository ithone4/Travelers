const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//GET policy choices made by user from policy_builder table -> based on user id
router.get('/:userID', (req, res) => {
    // console.log(`in GET of policy builder with req.body = `, req.body);
    // console.log(`in GET of policy builder with req.params = `, req.params);
    // console.log(`in GET of policy builder with req.query = `, req.query);
    const getPolicyBuilderQuery = `SELECT * from policy_builder WHERE user_id = ${req.params.userID};`;
    pool.query(getPolicyBuilderQuery)
        .then((results) => {
            console.log(`results are:`, results.rows)
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

/* ---> This POST query uses the "POST ON CONFLICT" statement which acts like a mix of 
   POST and PUT, also known as UPSERT. This will either INSERT a row, or on 
   the basis of the row already existing, UPDATE that existing row instead
*/
router.post('/', (req, res) => {
    /* Example of UPSERT -> Need this since we don't know if the user is updating
       or creating a new post*/
    // INSERT INTO students(id, firstname, lastname, gender, d_o_b, email)
    // VALUES (1516, 'Gerardo', 'Wood', 'M', 'January 27 1995', 'gerardo_woodka@gmail.com')
    // ON CONFLICT (id) DO UPDATE SET firstname = EXCLUDED.firstname, lastname = EXCLUDED.lastname;

    let columnNames = [];
    let columnValues = [];
    let postPolicyBuilderQuery;

    //Loop through the req.body.answers array to build up the arrays that will be used in the POST query
    req.body.answers.forEach(element => {
        console.log(`element is:`, element);
        columnNames.push(element.question); // <----array of column names
        columnValues.push(element.answer); // <----array of column values
    });
    //Check to see if we have a policy builder id. We might not if this is a new record.
    if (req.body.id !== '') {
        postPolicyBuilderQuery = `INSERT INTO policy_builder (id,user_id,`
    } else {
        postPolicyBuilderQuery = `INSERT INTO policy_builder (user_id,`
    }
    //add the column names
    columnNames.forEach(columnName => {
        postPolicyBuilderQuery += `${columnName},`
    })
    //get rid of the extra ',' at the end of queryString (for column names)
    postPolicyBuilderQuery = postPolicyBuilderQuery.slice(0, postPolicyBuilderQuery.length - 1);
    //Check to see if we have a policy builder id. We might not if this is a new record.
    if (req.body.id) {
        postPolicyBuilderQuery += `) VALUES (${req.body.id},${req.body.userId},`;
    } else {
        postPolicyBuilderQuery += `) VALUES (${req.body.userId},`;
    }
    //add the column names
    columnValues.forEach(columnValue => {
        postPolicyBuilderQuery += `${columnValue},`
    })
    //get rid of the extra ',' at the end of queryString (for column values)
    postPolicyBuilderQuery = postPolicyBuilderQuery.slice(0, postPolicyBuilderQuery.length - 1) + `)
                             ON CONFLICT (id) DO UPDATE SET `;
    for (const i of columnNames) {
        postPolicyBuilderQuery += `${i} = EXCLUDED.${i},`;
    }
    if (postPolicyBuilderQuery.length > 0) {
        postPolicyBuilderQuery = postPolicyBuilderQuery.slice(0, postPolicyBuilderQuery.length - 1) + `;`;
    }

    console.log(`postPolicyBuilderQuery is:`, postPolicyBuilderQuery);

    pool.query(postPolicyBuilderQuery)
        .then((results) => {
            res.sendStatus(201);
        }).catch((error) => {
            res.sendStatus(500);
        })
})

router.get('/culture/:id', (req, res) => {
    getCultureQuery = `SELECT culture from "user" where id = ${req.params.id};`;
    pool
        .query(getCultureQuery)
        .then((results) => {
            res.send(results.rows);
        }).catch((error) => {
            console.log(`error getting company culture for user`, error);
            res.sendStatus(500);
        })
})

module.exports = router;